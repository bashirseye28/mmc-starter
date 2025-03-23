import {
    Html,
    Head,
    Tailwind,
    Body,
    Container,
    Heading,
    Text,
  } from "@react-email/components";
  
  interface Props {
    name: string;
  }
  
  const ContactConfirmationTemplate = ({ name }: Props) => {
    return (
      <Html>
        <Head />
        <Tailwind>
          <Body className="bg-gray-100 font-sans">
            <Container className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto my-10">
              <Heading className="text-xl font-bold text-primary">
                Thank You for Contacting MMC, {name}!
              </Heading>
              <Text className="mt-4 text-base text-gray-700">
                We’ve received your message and will get back to you shortly.
              </Text>
              <Text className="text-sm text-gray-500 mt-6">
                — Manchester Murid Community
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default ContactConfirmationTemplate;