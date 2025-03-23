import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Img,
    Tailwind,
  } from "@react-email/components";
  
  interface VolunteerTemplateProps {
    fullName: string;
  }
  
  const VolunteerTemplate = ({ fullName }: VolunteerTemplateProps) => {
    return (
      <Html>
        <Head />
        <Tailwind>
          <Body className="bg-gray-100 font-sans">
            <Container className="bg-white rounded-xl shadow-md mx-auto my-10 p-6 max-w-lg border-t-4 border-primary">
              {/* ✅ Brand Logo */}
              <Img
                src="/images/logo.png" // <- Update this URL
                alt="MMC Logo"
                width="120"
                className="mx-auto mb-4"
              />
  
              {/* ✅ Heading */}
              <Heading className="text-primary text-center text-2xl font-bold">
                Thank You for Volunteering, {fullName}!
              </Heading>
  
              {/* ✅ Message */}
              <Text className="text-base text-gray-700 mt-4 leading-relaxed">
                We are excited to have you on board. Your support means the world to us and our community.
                Our team will review your submission and contact you soon with next steps.
              </Text>
  
              {/* ✅ Optional Footer */}
              <Section className="text-center mt-6">
                <Text className="text-sm text-gray-500">Stay connected:</Text>
                <Text className="text-sm text-primary">
                  Facebook | Instagram | mmc.org
                </Text>
              </Section>
  
              {/* ✅ Footer Brand */}
              <Text className="text-xs text-gray-400 mt-8 text-center">
                © {new Date().getFullYear()} Manchester Murid Community. All rights reserved.
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default VolunteerTemplate;