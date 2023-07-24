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
  name: z.string(),
  value: z.string(),
});

const TimeIntervalSchema = z.object({
  start: z.string(),
  end: z.string(),
});

const DaySchema = z.object({
  isClosed: z.boolean(),
  openIntervals: z.array(TimeIntervalSchema),
});

const HoursSchema = z.object({
  monday: DaySchema,
  tuesday: DaySchema,
  wednesday: DaySchema,
  thursday: DaySchema,
  friday: DaySchema,
  saturday: DaySchema,
  sunday: DaySchema,
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
});

const PhotoGalleryElementSchema = z.object({
  image: ImageSchema,
});

const PhotoGallerySchema = z.array(PhotoGalleryElementSchema);

export const ProductDataSchema = z.object({
  $key: KeySchema,
  c_abilityLevel: z.array(IconSchema),
  c_price: z.string(),
  c_specs: z.array(SpecSchema),
  c_terrain: z.array(IconSchema),
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
export type Module = z.infer<typeof ModuleSchema>;
export type SearchResults = z.infer<typeof SearchResultsSchema>;
