declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | number | undefined;
            GLOBAL_FETCH_PORT: number;
            GLOBAL_FETCH_IP: string;
            // add more environment variables and their types here
        }
    }
}