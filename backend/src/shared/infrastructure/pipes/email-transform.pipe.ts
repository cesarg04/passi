import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class EmailTransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && typeof value === "object") {
      return this.transformEmailsInObject(value);
    }
    return value;
  }

  private transformEmailsInObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformEmailsInObject(item));
    }

    if (obj && typeof obj === "object") {
      const transformed = { ...obj };

      for (const key in transformed) {
        if (transformed.hasOwnProperty(key)) {
          // Si la key contiene 'email' (case insensitive) y el valor es string
          if (
            key.toLowerCase().includes("email") &&
            typeof transformed[key] === "string"
          ) {
            transformed[key] = transformed[key].toLowerCase().trim();
          } else if (typeof transformed[key] === "object") {
            // Recursivamente transformar objetos anidados
            transformed[key] = this.transformEmailsInObject(transformed[key]);
          }
        }
      }

      return transformed;
    }

    return obj;
  }
}
