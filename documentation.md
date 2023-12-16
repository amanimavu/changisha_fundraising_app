# Database URL

Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB.
See the documentation for all the connection string options: [Connection Strings](https://pris.ly/d/connection-strings)

**Note**

-   Encode special characters of the password using [percent-encoding](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding)
-   Percent-encoding is a mechanism to encode 8-bit characters that have specific meanings in the context of URLs.
-   It is sometimes called URL encoding
-   Special characters needing encoding are:
-   ':', '/', '?', '#', '[', ']', '@', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';', '=', '%'
i.e my$q1-23 => my%24q1-23
