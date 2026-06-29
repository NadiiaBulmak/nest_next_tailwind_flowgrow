import Image from "next/image";

export default function AuthHeader() {
    return (
        <div className="flex w-full px-8 py-6 bg-bg-primary font-sans dark:bg-black">
            <Image
                className="dark:invert"
                src="/images/auth_header_logo.webp"
                alt="Flow.Grow. logo"
                width={160}
                height={45}
                priority
            />
        </div>
    );
}