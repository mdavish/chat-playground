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
});

export const ResultSchema = z.object({
  data: ProductDataSchema,
});

export const ModuleSchema = z.object({
  results: z.array(ResultSchema),
});

export const SearchResultsSchema = z.object({
  businessId: z.number(),
  modules: z.array(ModuleSchema),
});

export type Image = z.infer<typeof ImageSchema>;
export type Icon = z.infer<typeof IconSchema>;
export type Key = z.infer<typeof KeySchema>;
export type Spec = z.infer<typeof SpecSchema>;
export type ProductData = z.infer<typeof ProductDataSchema>;
export type Result = z.infer<typeof ResultSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type SearchResults = z.infer<typeof SearchResultsSchema>;
