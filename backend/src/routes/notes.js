import express from "express";
const router = express.Router();
import Note from "../models/note.model.js";
import { authenticateToken } from "../utils/utillities.js";
import { createClient } from 'redis';
import config from '../../config.js';
const redisClient = createClient(config.redis);

redisClient.connect().catch(console.error);
/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for managing notes
 */
/**
 * @swagger
 * /api/notes:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Get all notes
 *     description: Retrieve a list of all notes for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of notes
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(authenticateToken, (req, res) => {
  Note.find({ "user._id": req.user.id })
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @swagger
 * /api/notes/add:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Add a new note
 *     description: Create a new note for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Note added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route("/add").post(authenticateToken, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const user = req.user;
    console.log("userapi:", user);
    const newNote = new Note({
      title,
      content,
      tags,
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
      isPinned: false,
    });
    

    const savedNote = await newNote.save();
    res
      .status(201)
      .json({ message: "Note added successfully", note: savedNote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     tags:
 *       - Notes  
 *     summary: Get a specific note
 *     description: Retrieve a specific note by its ID for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested note
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.route("/:id").get(authenticateToken, (req, res) => {
  Note.findOne({ _id: req.params.id, "user._id": req.user.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json("Note not found");
      }
      res.json(note);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Check cache first
    const cachedNote = await redisClient.get(`note:${id}`);
    if (cachedNote) {
      return res.json(JSON.parse(cachedNote));
    }

    // If not in cache, fetch from database
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Cache the result
    await redisClient.set(`note:${id}`, JSON.stringify(note), {
      EX: 3600, // Expire after 1 hour
    });

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note', error: error.message });
  }
});

/**
 * @swagger
 * /api/notes/update/{id}:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Update a note
 *     description: Update a specific note by its ID for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.route("/update/:id").post(authenticateToken, (req, res) => {
  Note.findOne({ _id: req.params.id, "user._id": req.user.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json("Note not found");
      }
      note.title = req.body.title;
      note.content = req.body.content;
      note.updatedAt = Date.now();

      note
        .save()
        .then(() => res.json("Note updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     tags:
 *       - Notes
 *     summary: Delete a note
 *     description: Delete a specific note by its ID for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.route("/:id").delete(authenticateToken, (req, res) => {
  Note.findOneAndDelete({ _id: req.params.id, "user._id": req.user.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json("Note not found");
      }
      res.json("Note deleted.");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

export default router;
