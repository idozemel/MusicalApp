import mongoose from "mongoose";

export interface IScraing {
  isScraped: boolean;
}

const scrapingSchema = new mongoose.Schema({
  isScraped: {
    type: Boolean,
    default: false,
  },
});

export const Scraping = mongoose.model<IScraing>("Scraping", scrapingSchema);
