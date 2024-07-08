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
    keyword: string | null;
}

// SignUpForm.tsx
export interface SignUpFormDetailState {
    email: string;
    company: string;
    name: string;
    contact: string;
}