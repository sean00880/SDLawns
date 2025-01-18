"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { lawncareContent } from "../../data/content/lawncareContent";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Section = {
  title: string;
  description: string;
  image?: string;
};

type ServiceContent = {
  title: string;
  description: string;
  sections: Section[];
  testimonial?: {
    text: string;
    author: string;
  };
  images?: {
    before?: string;
    after?: string;
  };
  faq?: { question: string; answer: string }[];
};

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const content: ServiceContent | null = lawncareContent[id] || null; // Ensure `content

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!content) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="grey.100"
      >
        <Typography variant="h4" color="error" gutterBottom>
          Service Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We couldn't find the service you were looking for. Please explore our other landscaping
          solutions or contact us for assistance.
        </Typography>
      </Box>
    );
  }

  const renderList = (description: string) => {
    const items = description
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-")); // Only process valid list items

    return (
      <List>
        {items.map((line, idx) => (
          <ListItem key={idx} disableGutters sx={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <CheckCircleIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary={line.replace(/-\s\*\*/g, "").replace(/\*\*/g, "")}
              primaryTypographyProps={{
                variant: "body1",
                sx: { color: "text.primary", margin: 0 },
              }}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box bgcolor="grey.50">
      {/* Hero Section */}
      <Box
        py={8}
        textAlign="center"
        sx={{ background: "linear-gradient(to right, #2e7d32, #1b5e20)", color: "white" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" gutterBottom>
            {content.title}
          </Typography>
          <Typography variant="h6" component="p">
            {content.description.replace(/\*\*/g, "")}
          </Typography>
        </motion.div>
      </Box>

      {/* Main Content Section */}
      <Box maxWidth="lg" mx="auto" py={8} px={3}>
        {content.sections.map((section: Section, index: number) => (
          <Card
            key={index}
            sx={{
              mb: 6,
              display: "flex",
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              boxShadow: 3,
            }}
          >
            {section.image && (
              <CardMedia
                component="img"
                image={`/images/${section.image}`}
                alt={section.title}
                sx={{ width: "50%", objectFit: "cover" }}
              />
            )}
            <CardContent sx={{ width: "50%", p: 4 }}>
              <Typography variant="h5" sx={{ color: "#2e7d32" }} gutterBottom>
                {section.title}
              </Typography>
              {renderList(section.description)}
            </CardContent>
          </Card>
        ))}

        {/* Testimonial Section */}
        {content.testimonial && (
          <Card sx={{ p: 4, textAlign: "center", boxShadow: 3, mb: 8 }}>
            <Typography variant="body1" fontStyle="italic" color="textSecondary"  sx={{ color: "#2e7d32" }}>
              "{content.testimonial.text}"
            </Typography>
            <Typography variant="subtitle1" color="primary" mt={2}  sx={{ color: "#2e7d32" }}>
              - {content.testimonial.author}
            </Typography>
          </Card>
        )}

        {/* Before and After Images */}
        {content.images && (content.images.before || content.images.after) && (
          <Box display="flex" justifyContent="space-between" gap={4} mb={8}>
            {content.images.before && (
              <Card sx={{ width: "50%", boxShadow: 3 }}>
                <CardMedia component="img" image={`/images/${content.images.before}`} alt="Before Image" />
                <CardContent>
                  <Typography textAlign="center" color="textSecondary">
                    Before
                  </Typography>
                </CardContent>
              </Card>
            )}
            {content.images.after && (
              <Card sx={{ width: "50%", boxShadow: 3 }}>
                <CardMedia component="img" image={`/images/${content.images.after}`} alt="After Image" />
                <CardContent>
                  <Typography textAlign="center" color="textSecondary">
                    After
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        )}

        {/* FAQ Section */}
              {/* FAQ Section */}
               {/* FAQ Section */}
               {content.faq && content.faq.length > 0 && (
          <Box sx={{ height: "400px", overflow: "hidden", position: "relative" }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: "auto",
                paddingRight: "16px",
              }}
            >
              {content.faq.map((item, index) => (
                <Accordion
                  key={index}
                  expanded={activeFaq === index}
                  onChange={() => setActiveFaq(activeFaq === index ? null : index)}
                  sx={{
                    boxShadow: 2,
                    mb: 2,
                    transition: "height 0.3s ease-in-out",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-content-${index}`}
                    id={`faq-header-${index}`}
                    sx={{
                      backgroundColor: "grey.200",
                      '&:hover': { backgroundColor: "grey.300" },
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      maxHeight: "200px", // Ensure max height for the details section
                      overflowY: "auto", // Allow scrolling for long content
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Typography>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        )}


      </Box>
    </Box>
  );
}
