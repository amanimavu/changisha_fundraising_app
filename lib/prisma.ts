import { PrismaClient } from "@prisma/client";

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient;

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;

// when line 16 is deeply nested in the if condition of line 13 Typescript throws the error:
// Variable 'prisma' is used before being assigned
