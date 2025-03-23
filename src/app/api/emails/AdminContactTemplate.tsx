import {
    Html,
    Head,
    Tailwind,
    Body,
    Container,
    Heading,
    Text,
    Section,
  } from "@react-email/components";
  
  interface Props {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }
  
  export const AdminContactTemplate = ({ name, email, phone, message }: Props) => {
    return (
      <Html>
        <Head />
        <Tailwind>
          <Body className="bg-gray-100 font-sans">
            <Container className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto my-10">
              <Heading className="text-xl font-bold text-primary">
                📩 New Contact Message from {name}
              </Heading>
  
              <Section className="mt-4 space-y-1 text-sm text-gray-800">
                <Text><strong>Name:</strong> {name}</Text>
                <Text><strong>Email:</strong> {email}</Text>
                {phone && <Text><strong>Phone:</strong> {phone}</Text>}
                <Text className="mt-4"><strong>Message:</strong></Text>
                <Text className="italic text-gray-600">{message}</Text>
              </Section>
  
              <Text className="text-xs text-gray-400 mt-8">
                Sent automatically by the MMC Contact Form
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default AdminContactTemplate;