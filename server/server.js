const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Configure the connection to the Postgres database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gisdb',
  password: 'mas786mas',
  port: 5432,
});

// Route to fetch table names from the database
app.get('/api/tableNames', async (req, res) => {
  try {
    const query = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `;
    const { rows } = await pool.query(query);
    const tableNames = rows.map((row) => row.table_name);

    // Send the table names as a response
    res.json(tableNames);
  } catch (error) {
    console.error('Error fetching table names from the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch layer data in GeoJSON format
app.get('/api/tableData/:tableName', async (req, res) => {
  const { tableName } = req.params;
  try {
    const query = `
      SELECT
        'Feature' AS type,
        ST_AsGeoJSON(geom)::json AS geometry,
        '{}'::json AS properties
      FROM public.${tableName};
    `;
    const { rows } = await pool.query(query);
    const geojsonFeatures = rows.map((row) => ({
      type: row.type,
      geometry: row.geometry,
      properties: row.properties
    }));

    const geojson = {
      type: 'FeatureCollection',
      features: geojsonFeatures
    };

    res.json(geojson);
  } catch (error) {
    console.error(`Error fetching data from the ${tableName} table:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});