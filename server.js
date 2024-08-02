const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

const uri = 'mongodb+srv://tejasparatest:tejas%40554@renteasedb.fgzos4c.mongodb.net/rental_listings?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db('rental_listings').collection('delhi');

        // Build the query based on the request parameters
        let query = {};

        // Filter by price range
        if (req.query.priceRange) {
            const priceRange = parseInt(req.query.priceRange, 10);
            query.rent = { $lte: priceRange };
        }

        // Filter by number of bedrooms
        if (req.query.bedrooms) {
            query.bedrooms = { $in: req.query.bedrooms.split(',').map(bhk => parseInt(bhk.replace('bhk', ''), 10)) };
        }

        // Filter by amenities
        if (req.query.amenities) {
            query.amenities = { $all: req.query.amenities.split(',') };
        }

        const data = await collection.find(query).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    } finally {
        await client.close();
    }
});

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'property.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
