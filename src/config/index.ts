export interface Environment {
  name: "local" | "dev" | "staging" | "production";
  baseUrl: string;
}

const environment: Environment = {
  name: process.env.NEXT_PUBLIC_ENVIRONMENT as Environment["name"],
  baseUrl: (process.env.NEXT_PUBLIC_API_URL as string) || "http://localhost:3000",
};

// Shorter for environment to minimize space
export const env = environment;

export default environment;
