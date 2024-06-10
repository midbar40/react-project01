// data/mainSectionImgs.json
export interface mainBrandLogoData {
    id: number;
    src: string;
    title: string;
    alt: string;
    description: string;
}
// UserCheckForm.tsx
export interface RequestBody {
    name: string | null;
    number: string | null;
    keyword: string | null;
}

// SignUpForm.tsx
export interface SignUpFormState {
    email: string;
    password: string;
    passwordCheck: string;
    company: string;
    companyNumber: string;
    contact: string;
}