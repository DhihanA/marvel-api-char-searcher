//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import * as characters from '../data/characters.js';

router.route('/').get(async (req, res) => {
    //code here for GET will render the home handlebars file
    try {
        res.render('home', {
            title: "Marvel Character Finder",
            cssPath: '../public/site.css'
        }); // might have to change this to either views/home or just /home maybe even home
    } catch (e) {
        // console.log(e);
        res.status(500).json({error: e})
    }
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
    //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
    const characterData = req.body;
    let name = characterData.searchCharacterByName;
    let errors = [];
    try {
      if (!name) throw "A name must be provided.";
      if (typeof name !== "string") throw "The name must be a string.";
      name = name.trim();
      if (name.length === 0) throw "An empty spaces string is not valid.";
    } catch (e) {
        // console.log(e);
        errors.push(e);
    }

    if (errors.length > 0) {
        res.status(400).render('home', {
            errors: errors,
            hasErrors: true,
            title: 'Marvel Character Finder',
            cssPath: '../public/site.css'
        });
        return;
    }

    try {
        const matches = await characters.searchCharacterByName(name);
        res.render('characterSearchResults', {
            searchCharacterByName: name,
            characters: matches,
            title: "Marvel Characters Found",
            cssPath: '../public/site.css'
        });
    } catch (e) {
        // console.log(e)
        return res.status(404).render('home', {
            errors: e,
            hasErrors: true,
            title: 'Marvel Character Finder',
            cssPath: '../public/site.css'
        });    
    }
    
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
    //code here for GET a single character
    const characterData = req.params;
    let id = characterData.id;
    let errors = [];
    try {
      if (!id) throw "A id must be provided";
      if (typeof id !== "string") throw "The id must be a string.";
      id = id.trim();
      if (id.length === 0) throw "An empty spaces string is not valid.";
    } catch (e) {
        // console.log(e);
        errors.push(e);
    }

    if (errors.length > 0) {
        res.status(400).render('home', {
            errors: errors,
            hasErrors: true,
            title: 'Marvel Character Finder',
            cssPath: '../public/site.css'
        });
        return;
    }

    // console.log('here');
    // console.log(id);
    try {
        const match = await characters.searchCharacterById(id);
        // console.log('the function was successful');
        // console.log(match);
        // console.log(match[0].name);
        // console.log('so confused dude');
        // console.log(match.thumbnail.path);
        res.render('characterById', {
            // characterName: match.name,
            character: match[0],
            title: match[0].name,
            image: match[0].thumbnail.path + '/portrait_uncanny.jpg',
            cssPath: '../public/site.css'
        });
    } catch (e) {
        // console.log(e)
        return res.status(404).render('home', {
            errors: e,
            hasErrors: true,
            title: 'Marvel Character Finder',
            cssPath: '../public/site.css'
        });
    }

});

export default router
