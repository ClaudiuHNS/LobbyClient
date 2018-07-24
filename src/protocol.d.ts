declare namespace lobby {

}

declare namespace user {
    /**
     * Represents an user
     */
    interface User {
        /** ID of the user */
        id: number;
        /** Name of the user */
        username: string;
        /** ID of the icon */
        iconId: number;
    }

    interface Icon {
        id: number;

        iconURL: string;
    }
}