export interface IComponentClass {
    className: string
}

export interface INewsletterProps {
    joinNewsletter: (e:React.FormEvent<HTMLFormElement>) => void | null,
    email: {
        getter: string | undefined,
        setter: React.Dispatch<React.SetStateAction<string | undefined>>
    }
}