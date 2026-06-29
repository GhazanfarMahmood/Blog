import AuthCol from "./AuthCol";

export default function AuthWrapper(){
    return <>
        <div 
            className="grid min-h-screen lg:grid-cols-2 bg-body-bg"
        >
            <div 
                className="relative hidden overflow-hidden bg-linear-to-br from-white via-[#FBFBFF] to-[#F4F3FF] px-16 py-12 lg:flex lg:flex-col"
            >
                <AuthCol />
            </div>
        </div>
    </>
}