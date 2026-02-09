import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8080', 'http://127.0.0.1:5173', 'http://127.0.0.1:8080'],
    credentials: true
}));

// Serve Static Files (Crucial for images/resources)
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/data', express.static(path.join(__dirname, '../public/data')));
app.use('/resources', express.static(path.join(__dirname, '../public/resources')));

// Logging middleware (after body parser)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000 // Increased for admin usage
});
app.use('/api/', limiter);

// Auth Middleware
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token !== (process.env.ADMIN_TOKEN || 'admin-secret-token')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = req.body.type;
        const dir = type === 'image'
            ? path.join(__dirname, '../public/images/uploads')
            : path.join(__dirname, '../public/resources');
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedImages = /jpeg|jpg|png|webp/;
    const allowedDocs = /pdf/;
    const ext = path.extname(file.originalname).toLowerCase().slice(1);

    if (req.body.type === 'image' && allowedImages.test(ext)) {
        cb(null, true);
    } else if (req.body.type === 'resource' && allowedDocs.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Ensure directories
const ensureDirs = async () => {
    const dirs = [
        path.join(__dirname, '../public/data/landings'),
        path.join(__dirname, '../public/images/uploads'),
        path.join(__dirname, '../public/resources')
    ];
    for (const dir of dirs) {
        try {
            await fs.access(dir);
        } catch {
            await fs.mkdir(dir, { recursive: true });
        }
    }
    const landingsIndex = path.join(__dirname, '../public/data/landings/index.json');
    try {
        await fs.access(landingsIndex);
    } catch {
        await fs.writeFile(landingsIndex, '[]');
    }
};
ensureDirs();

// ROUTES

// Get all landings
app.get('/api/landings', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, '../public/data/landings/index.json'), 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read landings' });
    }
});

// Get single landing
app.get('/api/landings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const filePath = path.join(__dirname, `../public/data/landings/landing-${id}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(404).json({ error: 'Landing not found' });
    }
});

// Create new landing
app.post('/api/landings', requireAuth, async (req, res) => {
    try {
        const { name, slug, menuCategory } = req.body;

        if (!name || !slug) {
            return res.status(400).json({ error: 'Name and slug are required' });
        }

        const indexPath = path.join(__dirname, '../public/data/landings/index.json');
        let indexData = [];
        try {
            indexData = JSON.parse(await fs.readFile(indexPath, 'utf-8'));
        } catch (e) { }

        if (indexData.some(l => l.slug === slug)) {
            return res.status(400).json({ error: 'Slug already exists' });
        }

        const id = crypto.randomUUID();
        const newLanding = {
            id,
            name,
            slug,
            menuCategory: menuCategory || '',
            isFeatured: req.body.isFeatured === true || req.body.isFeatured === 'true',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
                hero: {
                    title: name,
                    subtitle: 'Subtítulo descriptivo',
                    backgroundImage: '/images/hero/default.jpg'
                },
                form: {
                    title: "Cotiza tu Seguro",
                    fields: [
                        { id: "nombre", label: "Nombre*", type: "text", required: true, placeholder: "" },
                        { id: "email", label: "Email*", type: "email", required: true, placeholder: "" },
                        { id: "telefono", label: "Teléfono", type: "tel", required: true, placeholder: "" },
                        { id: "cargo", label: "Cargo*", type: "select", options: ["Administrador", "Presidente"] }
                    ]
                },
                coverages: { title: "¿Qué protege?", subtitle: "Coberturas", items: [] },
                benefits: { title: "¿Por qué nosotros?", subtitle: "Beneficios", items: [] },
                faq: { title: "Preguntas Frecuentes", video: { title: "", iframeUrl: "", thumbnail: "" }, questions: [] },
                resources: { visible: false, title: "Recursos", subtitle: "", enabledResourceIds: [] }
            }
        };

        const filePath = path.join(__dirname, `../public/data/landings/landing-${id}.json`);
        await fs.writeFile(filePath, JSON.stringify(newLanding, null, 2));

        indexData.push({
            id,
            name,
            slug,
            menuCategory: newLanding.menuCategory,
            isFeatured: newLanding.isFeatured,
            createdAt: newLanding.createdAt,
            updatedAt: newLanding.updatedAt,
            content: { hero: newLanding.content.hero }
        });
        await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2));

        try {
            await updateMenu('add', newLanding);
        } catch (menuError) {
            console.error("Menu update failed, but landing created:", menuError);
        }

        res.json(newLanding);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create landing', details: error.message });
    }
});

// Update landing
app.put('/api/landings/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const filePath = path.join(__dirname, `../public/data/landings/landing-${id}.json`);
        let existingLanding;
        try {
            existingLanding = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        } catch (e) {
            return res.status(404).json({ error: 'Landing not found' });
        }

        const updatedLanding = {
            ...existingLanding,
            ...updates,
            id,
            isFeatured: updates.isFeatured === true || updates.isFeatured === 'true',
            updatedAt: new Date().toISOString()
        };

        await fs.writeFile(filePath, JSON.stringify(updatedLanding, null, 2));

        const indexPath = path.join(__dirname, '../public/data/landings/index.json');
        let indexData = [];
        try {
            indexData = JSON.parse(await fs.readFile(indexPath, 'utf-8'));
        } catch (e) {
            console.warn("Index file corrupt or missing during update, checking individual file only.");
        }

        const indexIndex = indexData.findIndex(l => l.id === id);
        if (indexIndex >= 0) {
            indexData[indexIndex] = {
                ...indexData[indexIndex],
                name: updatedLanding.name,
                slug: updatedLanding.slug,
                menuCategory: updatedLanding.menuCategory || "",
                isFeatured: updatedLanding.isFeatured,
                updatedAt: updatedLanding.updatedAt,
                content: { hero: updatedLanding.content.hero }
            };
            await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2));
        }

        try {
            await updateMenu('update', updatedLanding);
        } catch (menuError) {
            console.error("Menu update failed, but landing updated:", menuError);
        }

        res.json(updatedLanding);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update landing', details: error.message });
    }
});

// Helper to update menu
const updateMenu = async (action, landing) => {
    // action: 'add', 'update', 'delete'
    const menuPath = path.join(__dirname, '../public/data/menu-config.json');
    let menu = { items: [] };
    try {
        menu = JSON.parse(await fs.readFile(menuPath, 'utf-8'));
    } catch {
        // Init default if empty
        menu = {
            items: [
                { label: "Inicio", href: "/" },
                { label: "Seguros", href: "#", items: [] }
            ]
        };
    }

    if (action === 'add') {
        const category = landing.menuCategory;

        // If no category specified, do NOT add to menu
        if (!category) return;

        let added = false;

        const addToCategory = (items) => {
            for (let item of items) {
                if (item.label === category) {
                    if (!item.items) item.items = [];
                    item.items.push({ label: landing.name, href: landing.slug });
                    added = true;
                    return true;
                }
                if (item.items && item.items.length > 0) {
                    if (addToCategory(item.items)) return true;
                }
            }
            return false;
        };

        // Attempt to add to specific category
        addToCategory(menu.items);

        // If category not found, we arguably should NOT add to root to avoid clutter.
        // The previous logic added to root as fallback, which caused the user issue.
        // So we do nothing if not found.
    } else if (action === 'update') {
        const updateInItems = (items) => {
            for (let item of items) {
                if (item.href === landing.slug) {
                    item.label = landing.name;
                }
                if (item.items && item.items.length > 0) {
                    updateInItems(item.items);
                }
            }
        };
        updateInItems(menu.items);
    } else if (action === 'delete') {
        const deleteFromItems = (items) => {
            for (let i = 0; i < items.length; i++) {
                if (items[i].href === landing.slug) {
                    items.splice(i, 1);
                    i--;
                } else if (items[i].items) {
                    deleteFromItems(items[i].items);
                }
            }
        };
        deleteFromItems(menu.items);
    }

    await fs.writeFile(menuPath, JSON.stringify(menu, null, 2));
};

// GET Menu
app.get('/api/menu', async (req, res) => {
    const menuPath = path.join(__dirname, '../public/data/menu-config.json');
    try {
        const data = await fs.readFile(menuPath, 'utf-8');
        res.json(JSON.parse(data));
    } catch {
        res.json({ items: [] });
    }
});

// Update Menu
app.post('/api/menu', requireAuth, async (req, res) => {
    try {
        const menuPath = path.join(__dirname, '../public/data/menu-config.json');
        const menuData = req.body; // Expect { items: [...] }

        // Basic validation
        if (!menuData || !Array.isArray(menuData.items)) {
            return res.status(400).json({ error: 'Invalid menu data format' });
        }

        await fs.writeFile(menuPath, JSON.stringify(menuData, null, 2));
        res.json(menuData);
    } catch (error) {
        console.error("Failed to save menu:", error);
        res.status(500).json({ error: 'Failed to save menu configuration' });
    }
});


// Delete landing
app.delete('/api/landings/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const filePath = path.join(__dirname, `../public/data/landings/landing-${id}.json`);
        let landingSlug = "";
        try {
            // Read to get slug for menu deletion
            const l = JSON.parse(await fs.readFile(filePath, 'utf-8'));
            landingSlug = l.slug;
            await fs.unlink(filePath);
        } catch (e) { }

        const indexPath = path.join(__dirname, '../public/data/landings/index.json');
        let indexData = JSON.parse(await fs.readFile(indexPath, 'utf-8'));
        indexData = indexData.filter(l => l.id !== id);
        await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2));

        if (landingSlug) {
            await updateMenu('delete', { slug: landingSlug });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete landing' });
    }
});

// RESOURCES
// Get all resources
app.get('/api/resources', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../public/data/resources-library.json');
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            res.json(JSON.parse(data));
        } catch {
            // If missing, return empty
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read resources' });
    }
});

// Add resource to library
app.post('/api/resources', requireAuth, async (req, res) => {
    try {
        const resource = req.body;
        // resource: { id, title, description, url, buttonText }

        const filePath = path.join(__dirname, '../public/data/resources-library.json');
        let data = [];
        try {
            data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        } catch { }

        // Add or Update
        const existingIndex = data.findIndex(r => r.id === resource.id);
        if (existingIndex >= 0) {
            data[existingIndex] = { ...data[existingIndex], ...resource };
        } else {
            resource.id = resource.id || crypto.randomUUID();
            data.push(resource);
        }

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        res.json(resource);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save resource' });
    }
});

// IMAGES
// Get all images
app.get('/api/images', async (req, res) => {
    try {
        const uploadsDir = path.join(__dirname, '../public/images/uploads');
        // Ensure dir exists
        await fs.mkdir(uploadsDir, { recursive: true });

        const files = await fs.readdir(uploadsDir);
        const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
            .map(file => ({
                name: file,
                url: `/images/uploads/${file}`
            }));
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to list images' });
    }
});

// Upload
app.post('/api/upload', requireAuth, upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const type = req.body.type;
    const baseUrl = type === 'image' ? '/images/uploads/' : '/resources/';
    res.json({ url: baseUrl + req.file.filename });
});

// Serve the frontend (React app)
app.use(express.static(path.join(__dirname, '../dist')));

// SPA Catch-all: Send index.html for any route not handled by API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
