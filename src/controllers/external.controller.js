const EXT_URL = 'https://pvz-2-api.vercel.app/api/plants';

export const getExternalCatalogItems = (req, res) => {
    const URL = EXT_URL;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to retrieve external catalog items" });
        });
}

function getListOfNames(data) {
    return data.map(item => item.name);
}

const localDetailsCopy = new Map();
const TTL = 30 * 1000; // 30 segundos

export const getExternalItemDetail = (req, res) => {
    const { name } = req.params;

    console.log("Items en cache:", localDetailsCopy.size);
    
    // Buscar en cache por nombre
    if (localDetailsCopy.has(name)) {
        const cachedItem = localDetailsCopy.get(name);
        const cacheAge = Date.now() - cachedItem.fetchedAt;
        
        if (cacheAge < TTL) {
            console.log("Cache hit para:", name);
            return res.json(cachedItem);
        } else {
            console.log("Cache expirado para:", name);
            localDetailsCopy.delete(name);
        }
    }

    const URL = `${EXT_URL}/${name}`;
    console.log("Fetching from external API:", URL);
    
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Agregar timestamp al dato cacheado
            data.fetchedAt = Date.now();
            localDetailsCopy.set(name, data);
            console.log("Dato guardado en cache:", name);
            res.json(data);
        })
        .catch(err => {
            console.error('Error fetching item detail:', err);
            res.status(500).json({ error: "Failed to retrieve external catalog item detail" });
        });
}