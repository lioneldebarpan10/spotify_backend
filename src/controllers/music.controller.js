const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service")

// middleware of auth is done so we are replacing repeatative code

async function createMusic(req, res) {
   const { title } = req.body
   const file = req.file

   if (!file || !file.buffer) {
      return res.status(400).json({ message: "No music file uploaded" })
   }

   const result = await uploadFile(file.buffer.toString('base64'))

   const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
   })

   res.status(201).json({
      message: "Music Created Successfully",
      music: {
         id: music._id,
         uri: music.uri,
         title: music.title,
         artist: music.artist,
      }
   })
}

async function createAlbum(req, res) {
   // to create album we have to check artist

   const { title, musics } = req.body
   const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musics
   })

   res.status(201).json({
      message: "Album Created Successfully",
      album: {
         id: album._id,
         title: album.title,
         artist: album.artist,
         musics: album.musics
      }
   })
}

async function getAllMusics(req , res){
   // populate for artist details => only username ,email
   const musics = await musicModel.find().populate("artist" , "username email") 

   res.status(200).json({
      message: "Music Data Fetched Sucessfully",
      musics: musics
   })
}

async function getAllAlbums(req , res){

   const albums = await albumModel.find().populate("artist" , "username email").populate("musics")

   res.status(200).json({
      message: "Albums data fetched sucessfully",
      albums: albums
   })
}

module.exports = { createMusic, createAlbum , getAllMusics , getAllAlbums}

