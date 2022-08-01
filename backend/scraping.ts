import * as cheerio from "cheerio";
import * as puppeteer from "puppeteer";
import { RequestHandler, Router } from "express";
import { genreService } from "./modules/genre/genre.service";
const baseScarpingWebsite = "https://www.shazam.com";
const baseScarpingUri = `${baseScarpingWebsite}/charts/genre/world`;
const scrapingRouter = Router();

export const scrapingSongs: RequestHandler = async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const genres = await scrapingGenreList(page);
  await genreService.addGenres(genres);
  // for (let genre of genres) {
  //   await scrapingSongsByGenre(page, genre);
  // }
  await browser.close();
  res.json(genres);
};

const scrapingGenreList = async (page: puppeteer.Page) => {
  const genres: Array<string> = [];
  await page.goto(`${baseScarpingUri}/pop`, { waitUntil: "networkidle2" });
  await page.waitForSelector(".chart-nav select");
  const html = await page.evaluate(() => document.documentElement.innerHTML);
  const $ = cheerio.load(html);
  $(".chart-nav select")
    .children()
    .each((index, element) => {
      if (index > 0) genres.push($(element).text());
    });
  return genres;
};

const scrapingSongsByGenre = async (page: puppeteer.Page, genre: string) => {
  genre = genre
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace("&", "and")
    .replace("/", "-")
    .replace(/\,/g, "");
  console.log("Scraping " + genre);
  await page.goto(`${baseScarpingUri}/${genre}`, {
    waitUntil: "networkidle2",
  });
  const html = await page.evaluate(() => document.documentElement.innerHTML);
  const $ = cheerio.load(html);
  $("ul.tracks")
    .find("li.track")
    .each((index, element) => {
      const contentSection = $(element).find(".titleArtistContainer");
      const song = contentSection.find(".title a");
      const artist = contentSection.find(".artist a");

      const songName = song.text();
      const songLink = `${baseScarpingWebsite}/${song.attr("href")}`;
      const artistName = artist.text();
      const artistLink = artist.attr("href");
      console.log(`${index}  song Name - ${songName}`);
      console.log(`${index}  song Link - ${songLink}`);
      console.log(`${index}  artist Name - ${artistName}`);
      console.log(`${index}  artist Link - ${artistLink}`);
    });
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
};

scrapingRouter.get("/", scrapingSongs);

export default scrapingRouter;
