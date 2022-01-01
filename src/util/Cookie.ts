
export default class Cookie {

    public static parseCookiesToMap(cookie: string) :Map<string, string> {

        let cookies = new Map<string, string>();

        if (cookie == undefined) {
            return undefined;
        }

        const rawCookies = cookie.split('; ');

        rawCookies.forEach( rawCookie => {

            const parsedCookie = rawCookie.split('=');

            cookies.set(parsedCookie[0], parsedCookie[1]);
        })

        return cookies;
    }  
}