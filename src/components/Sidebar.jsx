import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    List,
    ListItem,
    ListItemPrefix,
    Typography,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { Code, ChevronDown } from 'lucide-react';

export function Sidebar({ onFunctionSelect }) {
    const [open, setOpen] = useState(1);
    const [activeFunction, setActiveFunction] = useState(null);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    // Get functions data from Redux
    const functions = useSelector((state) => state.functions.data);
    // console.log("Redux functions data:", functions);

    // Transform functions object into array of addresses - only from data object if it exists
    const functionAddresses = functions?.data ? Object.keys(functions.data) : [];
    // console.log("Function Addresses:", functionAddresses);

    const sections = [
        { id: 1, icon: Code, title: "Functions", data: functionAddresses },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
                {sections.map((section) => (
                    <Accordion
                        key={section.id}
                        open={open === section.id}
                        icon={
                            <ChevronDown
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === section.id ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(section.id)}
                            className="border-b-0 p-3 text-[12px] font-semibold text-gray-800 uppercase tracking-wider"
                        >
                            <ListItemPrefix>
                                <section.icon className="h-4 w-4" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-medium">
                                {section.title}
                            </Typography>
                        </AccordionHeader>
                        <AccordionBody className="py-0">
                            <List className="p-0">
                                {section.data.map((address, index) => (
                                    <ListItem
                                        key={index}
                                        onClick={() => {
                                            const functionData = functions.data[address];
                                            setActiveFunction(address);
                                            onFunctionSelect(functionData);
                                        }}
                                        className={`text-[12px] py-2 cursor-pointer rounded-sm font-mono transition-colors duration-200 ${
                                            activeFunction === address 
                                            ? "bg-gray-300 text-white hover:bg-gray-300" 
                                            : "hover:bg-blue-gray-50"
                                        }`}
                                    >
                                        <div>
                                            <Typography 
                                                variant="small" 
                                                color={activeFunction === address ? "gray" : "blue-gray"} 
                                                className="font-medium font-mono"
                                            >
                                                {address}
                                            </Typography>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionBody>
                    </Accordion>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;