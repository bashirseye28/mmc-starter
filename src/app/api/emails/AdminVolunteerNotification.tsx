import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Heading,
    Text,
    Tailwind,
  } from "@react-email/components";
  
  interface AdminVolunteerNotificationProps {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    message: string;
  }
  
  const AdminVolunteerNotification = ({
    fullName,
    email,
    phone,
    role,
    message,
  }: AdminVolunteerNotificationProps) => {
    return (
      <Html>
        <Head />
        <Tailwind>
          <Body className="bg-gray-100 font-sans">
            <Container className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto my-10">
              <Heading className="text-xl font-bold text-primary mb-2">
                New Volunteer Submission
              </Heading>
  
              <Text><strong>Name:</strong> {fullName}</Text>
              <Text><strong>Email:</strong> {email}</Text>
              <Text><strong>Phone:</strong> {phone}</Text>
              <Text><strong>Role:</strong> {role}</Text>
              <Text><strong>Message:</strong> {message || "—"}</Text>
  
              <Section className="mt-6">
                <Text className="text-sm text-gray-500">
                  This notification was sent automatically from the MMC website.
                </Text>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default AdminVolunteerNotification;