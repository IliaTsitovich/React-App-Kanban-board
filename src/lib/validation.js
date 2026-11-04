import { z } from 'zod';

export const profileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(24, 'Name must be at most 24 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores allowed'),
});

export const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120, 'Title is too long'),
  description: z.string().max(2000, 'Description is too long').optional().default(''),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.string().optional().nullable(),
});

// Shapes of what's persisted in localStorage, checked on every read.
export const profilesSchema = z.array(
  z.object({
    id: z.string(),
    username: z.string(),
    createdAt: z.string().optional(),
  })
);

export const sessionSchema = z.object({ userId: z.string() }).nullable();

export const themeSchema = z.enum(['light', 'dark']);

export const boardSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().catch(''),
    status: z.enum(['backlog', 'ready', 'in-progress', 'finished']).catch('backlog'),
    order: z.number(),
    priority: z.enum(['low', 'medium', 'high']).catch('medium'),
    dueDate: z.string().nullable().catch(null),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    sample: z.boolean().optional(),
  })
);
