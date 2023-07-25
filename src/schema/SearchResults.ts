import { z } from "zod";

export const ImageSchema = z.object({
  height: z.number(),
  thumbnails: z.array(z.unknown()),
  url: z.string(),
  width: z.number(),
});

export const IconSchema = z.object({
  c_icon: z.object({
    image: ImageSchema,
  }),
  name: z.string(),
});

export const KeySchema = z.object({
  locale: z.string(),
  primary_key: z.string(),
});

export const SpecSchema = z.object({
  name: z.string().optional(),
  value: z.string().optional(),
});

const TimeIntervalSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
});

const DaySchema = z.object({
  isClosed: z.boolean().optional(),
  openIntervals: z.array(TimeIntervalSchema).optional(),
});

const HoursSchema = z.object({
  monday: DaySchema.optional(),
  tuesday: DaySchema.optional(),
  wednesday: DaySchema.optional(),
  thursday: DaySchema.optional(),
  friday: DaySchema.optional(),
  saturday: DaySchema.optional(),
  sunday: DaySchema.optional(),
});

const AddressSchema = z.object({
  city: z.string(),
  countryCode: z.string(),
  line1: z.string(),
  postalCode: z.string(),
  region: z.string(),
});

const LocationDataSchema = z.object({
  address: AddressSchema,
  c_deployedURL: z.string().url().optional(),
  description: z.string().optional(),
  hours: HoursSchema.optional(),
  mainPhone: z.string().optional(),
  name: z.string(),
  yextDisplayCoordinate: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

const PhotoGalleryElementSchema = z.object({
  image: ImageSchema,
});

const PhotoGallerySchema = z.array(PhotoGalleryElementSchema);

export const ProductDataSchema = z.object({
  $key: KeySchema,
  c_abilityLevel: z.array(IconSchema),
  c_price: z.string(),
  c_specs: z.array(SpecSchema).optional(),
  c_terrain: z.array(IconSchema).optional(),
  c_turningRadius: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  photoGallery: PhotoGallerySchema,
});

export const ProductModuleSchema = z.object({
  verticalConfigId: z.literal("products"),
  results: z.array(
    z.object({
      data: ProductDataSchema,
    })
  ),
});

export const LocationModuleSchema = z.object({
  verticalConfigId: z.literal("locations"),
  results: z.array(
    z.object({
      data: LocationDataSchema,
    })
  ),
});

export const ModuleSchema = z.union([
  ProductModuleSchema,
  LocationModuleSchema,
]);

export const SearchResultsSchema = z.object({
  businessId: z.number(),
  modules: z.array(ModuleSchema),
});

export type Image = z.infer<typeof ImageSchema>;
export type Icon = z.infer<typeof IconSchema>;
export type Key = z.infer<typeof KeySchema>;
export type Spec = z.infer<typeof SpecSchema>;
export type ProductData = z.infer<typeof ProductDataSchema>;
export type LocationData = z.infer<typeof LocationDataSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type SearchResults = z.infer<typeof SearchResultsSchema>;