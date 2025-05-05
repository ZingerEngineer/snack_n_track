import { z } from 'zod'

// Define a common interface for all schema providers
interface ISchemaProvider {
  validate(data: unknown): { success: boolean; error?: unknown }
}

// Base schema provider class
class SchemaProvider implements ISchemaProvider {
  protected schema: unknown

  constructor(schema: unknown) {
    this.schema = schema
  }

  validate(data: unknown): { success: boolean; error?: unknown } {
    throw new Error('Method not implemented in base class')
  }
}

// Zod-specific implementation
class ZodSchemaProvider extends SchemaProvider {
  protected schema: z.ZodTypeAny

  constructor(schema: z.ZodTypeAny) {
    super(schema)
    this.schema = schema
  }

  validate(data: unknown): { success: boolean; error?: unknown } {
    const result = this.schema.safeParse(data)
    return {
      success: result.success,
      error: result.success ? undefined : result.error
    }
  }
}

// File checker interface
interface IFileChecker {
  isAllowed(file: unknown): boolean
}

// Base file checker class
class FileChecker implements IFileChecker {
  protected schemaProvider: ISchemaProvider

  constructor(schemaProvider: ISchemaProvider) {
    this.schemaProvider = schemaProvider
  }

  isAllowed(file: unknown): boolean {
    const result = this.schemaProvider.validate(file)
    if (!result.success) {
      throw new Error(`Invalid file: ${result.error}`)
    }
    return true
  }
}

// Implementation for image files using Zod
export class ZodImageFileChecker extends FileChecker {
  constructor() {
    const imageSchema = z.object({
      filePath: z.string().min(1),
      mimeType: z.string().refine(
        (value) => {
          const mimeTypes = ['image/jpeg', 'image/png', 'image/webp']
          return mimeTypes.includes(value)
        },
        {
          message: 'Invalid MIME type'
        }
      )
    })

    super(new ZodSchemaProvider(imageSchema))
  }
}
