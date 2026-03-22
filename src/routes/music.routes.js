const express = require("express")
const router = express.Router();
const multer = require('multer')
const { createMusic , createAlbum , getAllMusics , getAllAlbums, getAlbumById } = require("../controllers/music.controller")
const authMiddleware = require('../middlewares/auth.middleware')

const upload = multer({
   storage: multer.memoryStorage()
})
router.post("/upload", authMiddleware.authArtist ,upload.single("music"),createMusic)
router.post("/album" ,authMiddleware.authArtist , createAlbum)

// localhost:3000/api/music/
router.get("/", authMiddleware.authUser, getAllMusics) // user can only fetch all music
router.get("/albums" , authMiddleware.authUser , getAllAlbums) // user can only fetch all albums

router.get("/albums/:albumId" , authMiddleware.authUser , getAlbumById) // albums fetched based on Id

module.exports = router;