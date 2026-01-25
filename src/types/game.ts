export type Region = 'africa' | 'europe' | 'americas';

export interface RegionData {
  name: string;
  displayName: string;
  phRange: { min: number; max: number };
  soilType: string;
  bestCrops: string[];
  color: string;
}

export const REGIONS: Record<Region, RegionData> = {
  africa: {
    name: 'africa',
    displayName: 'Africa',
    phRange: { min: 5.0, max: 6.0 },
    soilType: 'Tropical Acidic',
    bestCrops: ['Coffee', 'Cocoa'],
    color: '#4a7a5a',
  },
  europe: {
    name: 'europe',
    displayName: 'Europe',
    phRange: { min: 6.5, max: 7.0 },
    soilType: 'Temperate Neutral',
    bestCrops: ['Wheat (Qamh)'],
    color: '#2a5038',
  },
  americas: {
    name: 'americas',
    displayName: 'Americas',
    phRange: { min: 5.0, max: 6.0 },
    soilType: 'Tropical Acidic',
    bestCrops: ['Coffee', 'Sugarcane'],
    color: '#3a6b4a',
  },
};

export const TRAVEL_COST = 5000;
