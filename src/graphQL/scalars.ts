import { GraphQLScalarType, Kind } from "graphql";

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom scalar type for Date",
  serialize(value: any) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw new Error("Invalid Date");
  },
  parseValue(value: any) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date;
    }
    throw new Error("Invalid Date");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    throw new Error("Invalid Date");
  },
});

export const EmailScalar = new GraphQLScalarType({
  name: "Email",
  description: "Custom scalar type for Email",
  serialize(value: any) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (typeof value === "string" && emailRegex.test(value)) {
      return value;
    }
    throw new Error("Invalid Email");
  },
  parseValue(value: any) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (typeof value === "string" && emailRegex.test(value)) {
      return value;
    }
    throw new Error("Invalid Email");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(ast.value)) {
        return ast.value;
      }
    }
    throw new Error("Invalid Email");
  },
});

export const URLScalar = new GraphQLScalarType({
  name: "URL",
  description: "Custom scalar type for URL",
  serialize(value: any) {
    try {
      const url = new URL(value);
      return url.toString();
    } catch (err) {
      throw new Error("Invalid URL");
    }
  },
  parseValue(value: any) {
    try {
      const url = new URL(value);
      return url;
    } catch (err) {
      throw new Error("Invalid URL");
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      try {
        const url = new URL(ast.value);
        return url;
      } catch (err) {
        throw new Error("Invalid URL");
      }
    }
    throw new Error("Invalid URL");
  },
});
