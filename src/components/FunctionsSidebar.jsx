import React from 'react';

import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Code, Layout, ChevronDown } from 'lucide-react';

export function FunctionsSidebar({ mockAnalysis, onFunctionSelect }) {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <Card
      className="h-full w-full max-w-[20rem] p-4 shadow-none rounded-none border-r border-gray-200"
    >
      <Accordion
        
        open={open === 1}
        icon={
          <ChevronDown
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
          />
        }
      >
        <AccordionHeader

          onClick={() => handleOpen(1)}
          className="border-b-0 p-3 text-sm font-semibold"
        >
          <ListItemPrefix 
           
          >
            <Code className="h-4 w-4" />
          </ListItemPrefix>
          <Typography
            
            color="blue-gray" className="mr-auto font-normal">
            Functions
          </Typography>
        </AccordionHeader>
        <AccordionBody className="py-0">
          <List
           
            className="p-0">
            {mockAnalysis?.functions?.map((func, index) => (
              <ListItem
               
                key={index}
                onClick={() => onFunctionSelect(func)}
                className="text-sm py-2"
              >
                <Typography                 
                  variant="small" color="blue-gray">
                  {func.name}
                  <Typography
                   
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {func.address}
                  </Typography>
                </Typography>
              </ListItem>
            ))}
          </List>
        </AccordionBody>
      </Accordion>

      <Accordion
        
        open={open === 2}
        icon={
          <ChevronDown
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
          />
        }
      >
        <AccordionHeader

          onClick={() => handleOpen(2)}
          className="border-b-0 p-3 text-sm font-semibold"
        >
          <ListItemPrefix 
          >
            <Layout className="h-4 w-4" />
          </ListItemPrefix>
          <Typography
            color="blue-gray" className="mr-auto font-normal">
            Sections
          </Typography>
        </AccordionHeader>
        <AccordionBody className="py-0">
          <List
           
            className="p-0">
            {mockAnalysis?.sections?.map((section, index) => (
              <ListItem
               
                key={index}
                className="text-sm py-2"
              >
                <Typography

                  variant="small" color="blue-gray">
                  {section.name}
                  <Typography
                    
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Size: {section.size} bytes
                  </Typography>
                </Typography>
              </ListItem>
            ))}
          </List>
        </AccordionBody>
      </Accordion>
    </Card>
  );
}

export default FunctionsSidebar;