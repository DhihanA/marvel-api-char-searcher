//import axios, md5
import axios from "axios";
import md5 from "blueimp-md5";
import { publickey, privatekey } from "../helpers.js";

export const searchCharacterByName = async (name) => {
    //Function to search the api and return up to 15 characters matching the name param
    // basic error checking for input
    if (!name) throw "A name must be provided";
    if (typeof name !== "string") throw "The name must be a string.";
    name = name.trim();
    if (name.length === 0) throw "An empty spaces string is not valid.";

    // given to us, making the url
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=' + name + '&limit=15'; // only 15
    const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const matches = await axios.get(url);

    return matches.data.data.results // returning only the results since thats all we need
};

export const searchCharacterById = async (id) => {
    //Function to fetch a character from the api matching the id
    // basic error checking for input
    if (!id) throw "A id must be provided";
    if (typeof id !== "string") throw "The id must be a string.";
    id = id.trim();
    if (id.length === 0) throw "An empty spaces string is not valid.";

    // given to us, making the url
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com/v1/public/characters/' + id;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const matches = await axios.get(url);
    
    return matches.data.data.results; // returning only the results since thats all we need
};
