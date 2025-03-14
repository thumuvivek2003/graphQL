import {
  GraphQLDirective,
  DirectiveLocation,
  defaultFieldResolver,
} from "graphql";

// Custom directive to convert the text to uppercase
class UppercaseDirective extends GraphQLDirective {
  constructor() {
    super({
      name: "uppercase",
      locations: [DirectiveLocation.FIELD_DEFINITION], // We only apply it to field definitions
    });
  }
}

export const myDirectives = {
  uppercase: UppercaseDirective,
};
