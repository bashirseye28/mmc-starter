import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Tailwind,
} from "@react-email/components";

export default function ContactTemplate({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-10">
            <Heading className="text-xl text-primary font-bold text-center mb-4">
              Thank You, {name}!
            </Heading>
            <Text className="text-gray-700 text-sm">
              We’ve received your message. Our team will review it and get back to you shortly.
            </Text>
            <Text className="text-sm text-gray-500 mt-6 text-center">
              © {new Date().getFullYear()} Manchester Murid Community (MMC)
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}