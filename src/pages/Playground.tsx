// @ts-nocheck
import React, { useState, useRef } from "react";
import {
  FlaskConical, Type, ToggleLeft, Table2, Upload, Sparkles, Check, ChevronDown, CheckCircle,
  HelpCircle, Play, Sliders, Grid, RefreshCw, Layers, HelpCircle as HelpIcon
} from "lucide-react";

// Standard templates & layouts
import SkeuCard from "../components/shared/SkueCard";
import SectionHeading from "../components/shared/SectionHeading";
import { TruncatedCell } from "../components/shared/TruncatedCell";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/Slider";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/Input-Otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio-Group";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/Toggle-Group";
import { Calendar } from "@/components/ui/Calendar";

// Feedback & Display
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordian";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/Breadcrumb";
import { Progress } from "@/components/ui/Progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/Hover-Card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/Collapsible";

// Overlays & Dialogs
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/Drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/Alert-Dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";

// Advanced
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/Resizable";

import { useToast } from "@/components/ui/use-toast";

const sampleTableData = [
  { id: 1, name: "Widget Alpha", category: "Electronics", price: 29.99, stock: 150 },
  { id: 2, name: "Gadget Beta", category: "Accessories", price: 14.50, stock: 340 },
  { id: 3, name: "Module Gamma", category: "Electronics", price: 89.00, stock: 42 },
  { id: 4, name: "Part Delta", category: "Hardware", price: 5.25, stock: 1200 },
  { id: 5, name: "Sensor Epsilon", category: "Electronics", price: 45.00, stock: 88 },
];

export default function Playground() {
  const [textVal, setTextVal] = useState("");
  const [textareaVal, setTextareaVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [numberVal, setNumberVal] = useState("");
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [switchVal, setSwitchVal] = useState(false);
  const [sliderVal, setSliderVal] = useState([50]);
  const [otpVal, setOtpVal] = useState("");
  const [radioVal, setRadioVal] = useState("option1");
  const [dropdownVal, setDropdownVal] = useState("");
  const [multiSelect, setMultiSelect] = useState([]);
  const [sortCol, setSortCol] = useState("name");
  const [sortDir, setSortDir] = useState(1);
  const [tableFilter, setTableFilter] = useState("");
  const [tablePage, setTablePage] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [dynamicItems, setDynamicItems] = useState([]);
  const [loadingDynamic, setLoadingDynamic] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [progressVal, setProgressVal] = useState(33);
  const [dateVal, setDateVal] = useState<Date | undefined>(new Date());
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [toggleActive, setToggleActive] = useState(false);
  const [toggleGroupVal, setToggleGroupVal] = useState("center");
  
  const fileRef = useRef(null);
  const { toast } = useToast();

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(-sortDir);
    else { setSortCol(col); setSortDir(1); }
  };

  const sortedFiltered = sampleTableData
    .filter((r) => !tableFilter || r.category.toLowerCase().includes(tableFilter.toLowerCase()) || r.name.toLowerCase().includes(tableFilter.toLowerCase()))
    .sort((a, b) => {
      const va = a[sortCol], vb = b[sortCol];
      return typeof va === "string" ? va.localeCompare(vb) * sortDir : (va - vb) * sortDir;
    });

  const pageSize = 3;
  const pageCount = Math.ceil(sortedFiltered.length / pageSize);
  const pagedData = sortedFiltered.slice(tablePage * pageSize, (tablePage + 1) * pageSize);

  const handleFiles = (files) => {
    setUploadedFiles((prev) => [...prev, ...Array.from(files).map((f) => ({ name: f.name, size: f.size, type: f.type }))]);
    toast({ title: `${files.length} file(s) added` });
  };

  const loadDynamic = () => {
    setLoadingDynamic(true);
    setTimeout(() => {
      setDynamicItems(["Dynamic Item A", "Dynamic Item B", "Dynamic Item C"]);
      setLoadingDynamic(false);
    }, 1200);
  };

  const multiOptions = ["React", "Vue", "Angular", "Svelte"];
  const toggleMulti = (opt) => {
    setMultiSelect((prev) => prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]);
  };

  return (
    <div className="notion-page pb-16 max-w-6xl mx-auto px-4">
      {/* Title */}
      <div className="mb-8 border-b border-border pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <FlaskConical className="w-5 h-5 text-white animate-pulse" />
            </div>
            <h1 className="font-heading font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
              QA Playground
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ml-14">
            Fully interactive test matrix showcasing 100% of the workspace UI components.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-indigo-500/30 text-indigo-500 bg-indigo-500/5 px-3 py-1">
            Component Coverage: 100%
          </Badge>
        </div>
      </div>

      <TooltipProvider>
        <Tabs defaultValue="inputs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 p-1 bg-muted/50 rounded-xl h-12">
            <TabsTrigger value="inputs" className="text-xs sm:text-sm font-medium rounded-lg h-10">Inputs & Selection</TabsTrigger>
            <TabsTrigger value="buttons" className="text-xs sm:text-sm font-medium rounded-lg h-10">Buttons & Actions</TabsTrigger>
            <TabsTrigger value="display" className="text-xs sm:text-sm font-medium rounded-lg h-10">Data & Display</TabsTrigger>
            <TabsTrigger value="overlays" className="text-xs sm:text-sm font-medium rounded-lg h-10">Dialogs & Sheets</TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs sm:text-sm font-medium rounded-lg h-10">Advanced & Labs</TabsTrigger>
          </TabsList>

          {/* TAB 1: INPUTS & SELECTION */}
          <TabsContent value="inputs" className="space-y-6 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Form Input fields */}
              <SkeuCard className="p-6">
                <SectionHeading icon={Type} title="Standard Inputs" description="Strictly typed and responsive inputs" />
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="playground-text">Text Input</Label>
                    <Input id="playground-text" data-testid="text-input" placeholder="Enter text..." value={textVal} onChange={(e) => setTextVal(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="playground-password">Password</Label>
                    <Input id="playground-password" type="password" data-testid="password-input" placeholder="••••••••" value={passwordVal} onChange={(e) => setPasswordVal(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="playground-number">Number</Label>
                      <Input id="playground-number" type="number" data-testid="number-input" placeholder="0" value={numberVal} onChange={(e) => setNumberVal(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="playground-switch">Switch Toggle</Label>
                      <div className="flex items-center space-x-2 h-10">
                        <Switch id="playground-switch" checked={switchVal} onCheckedChange={setSwitchVal} />
                        <span className="text-xs text-muted-foreground">{switchVal ? "ON" : "OFF"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="playground-textarea">Textarea</Label>
                    <Textarea id="playground-textarea" data-testid="textarea-input" placeholder="Write something..." value={textareaVal} onChange={(e) => setTextareaVal(e.target.value)} className="min-h-[80px]" />
                  </div>
                </div>
              </SkeuCard>

              {/* Advanced Selectors, Sliders, OTP */}
              <SkeuCard className="p-6">
                <SectionHeading icon={ToggleLeft} title="Advanced Selection" description="OTP codes, sliders, checkboxes & drop-downs" />
                <div className="space-y-5 mt-4">
                  <div className="space-y-2">
                    <Label>Input OTP (6-digits)</Label>
                    <div className="flex justify-start">
                      <InputOTP maxLength={6} value={otpVal} onChange={setOtpVal}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    {otpVal && <p className="text-xs text-indigo-500 font-mono">Entered OTP: {otpVal}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Slider Range</Label>
                      <span className="text-xs font-mono text-muted-foreground">{sliderVal[0]}%</span>
                    </div>
                    <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Checkbox Group</Label>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox id="terms" checked={checkboxVal} onCheckedChange={setCheckboxVal} />
                        <Label htmlFor="terms" className="text-xs font-normal cursor-pointer select-none">Accept terms</Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Dropdown (Select)</Label>
                      <Select value={dropdownVal} onValueChange={setDropdownVal}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Fruit..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="cherry">Cherry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                    <div>
                      <Label className="mb-2 block">Radio Group</Label>
                      <RadioGroup value={radioVal} onValueChange={setRadioVal} className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option1" id="r1" />
                          <Label htmlFor="r1" className="text-xs font-normal cursor-pointer">Option One</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option2" id="r2" />
                          <Label htmlFor="r2" className="text-xs font-normal cursor-pointer">Option Two</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="mb-2 block">Multi-Select List</Label>
                      <div className="border rounded-lg p-2 max-h-[100px] overflow-y-auto space-y-1 bg-card">
                        {multiOptions.map((opt) => (
                          <div key={opt} className="flex items-center space-x-2">
                            <Checkbox id={`multi-${opt}`} checked={multiSelect.includes(opt)} onCheckedChange={() => toggleMulti(opt)} />
                            <Label htmlFor={`multi-${opt}`} className="text-xs font-normal cursor-pointer">{opt}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SkeuCard>
            </div>

            {/* Calendar Widget */}
            <div className="grid md:grid-cols-2 gap-6">
              <SkeuCard className="p-6 flex flex-col justify-between">
                <div>
                  <SectionHeading icon={Grid} title="Calendar System" description="Native interactive datepicker component" />
                  <div className="flex justify-center items-center mt-4 bg-muted/20 border rounded-xl p-2">
                    <Calendar
                      mode="single"
                      selected={dateVal}
                      onSelect={setDateVal}
                      captionLayout="dropdown-buttons"
                      fromYear={new Date().getFullYear() - 10}
                      toYear={new Date().getFullYear() + 10}
                      className="rounded-md"
                    />
                  </div>
                </div>
                {dateVal && (
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Selected Date: <span className="font-semibold text-foreground">{dateVal.toLocaleDateString()}</span>
                  </p>
                )}
              </SkeuCard>

              <SkeuCard className="p-6">
                <SectionHeading icon={Layers} title="Interactive Collapsible" description="Show/Hide component details dynamically" />
                <div className="mt-4 space-y-4">
                  <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen} className="w-full space-y-2">
                    <div className="flex items-center justify-between space-x-4 px-4 py-2 border rounded-lg bg-muted/40">
                      <h4 className="text-sm font-semibold">Repository Configuration</h4>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCollapsibleOpen ? "transform rotate-180" : ""}`} />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <div className="rounded-md border px-4 py-3 font-mono text-xs bg-muted/20">
                      @pw-core/pw-core
                    </div>
                    <CollapsibleContent className="space-y-2">
                      <div className="rounded-md border px-4 py-3 font-mono text-xs bg-card">
                        environment: production
                      </div>
                      <div className="rounded-md border px-4 py-3 font-mono text-xs bg-card">
                        region: us-east-1
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="border-t border-border pt-4">
                    <Label className="mb-2 block">Progress Bar Indicator</Label>
                    <Progress value={progressVal} className="mb-3" />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setProgressVal(Math.max(0, progressVal - 10))}>-10%</Button>
                      <Button variant="outline" size="sm" onClick={() => setProgressVal(Math.min(100, progressVal + 10))}>+10%</Button>
                    </div>
                  </div>
                </div>
              </SkeuCard>
            </div>
          </TabsContent>

          {/* TAB 2: BUTTONS & ACTIONS */}
          <TabsContent value="buttons" className="space-y-6 animate-in fade-in duration-300">
            <SkeuCard className="p-6">
              <SectionHeading icon={Sliders} title="Button System & Variations" description="Variants, states, and interactive toggles" />
              
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h3 className="text-sm font-semibold mb-4 text-indigo-500">Standard Button Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline Variant</Button>
                    <Button variant="destructive">Destructive Action</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="link">Link Style</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-4 text-indigo-500">Toggles & Toggle Groups</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Toggle aria-label="Toggle bold" pressed={toggleActive} onPressedChange={setToggleActive}>
                        <Check className="h-4 w-4 mr-2" /> {toggleActive ? "Active" : "Inactive"}
                      </Toggle>
                      <span className="text-xs text-muted-foreground">Single toggle state</span>
                    </div>

                    <div className="space-y-2">
                      <Label>Alignment Toggle Group</Label>
                      <ToggleGroup type="single" value={toggleGroupVal} onValueChange={(val) => val && setToggleGroupVal(val)}>
                        <ToggleGroupItem value="left" aria-label="Align left">Left Align</ToggleGroupItem>
                        <ToggleGroupItem value="center" aria-label="Align center">Center Align</ToggleGroupItem>
                        <ToggleGroupItem value="right" aria-label="Align right">Right Align</ToggleGroupItem>
                      </ToggleGroup>
                      <p className="text-xs text-muted-foreground">Selected value: <span className="font-mono text-foreground font-semibold">{toggleGroupVal}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </SkeuCard>
          </TabsContent>

          {/* TAB 3: DATA & DISPLAY */}
          <TabsContent value="display" className="space-y-6 animate-in fade-in duration-300">
            {/* Breadcrumb, Badge, Avatar, Tooltip */}
            <div className="grid md:grid-cols-2 gap-6">
              <SkeuCard className="p-6">
                <SectionHeading icon={Layers} title="Micro Components" description="Badges, avatars, breadcrumbs, and tooltips" />
                <div className="space-y-6 mt-4">
                  
                  {/* Breadcrumb */}
                  <div className="space-y-1">
                    <Label className="text-xs">Breadcrumb Navigation</Label>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">Library</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>QA Playground</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>

                  {/* Badges */}
                  <div className="space-y-2">
                    <Label className="text-xs block">Badges</Label>
                    <div className="flex gap-2">
                      <Badge variant="default">New</Badge>
                      <Badge variant="secondary">In Progress</Badge>
                      <Badge variant="destructive">Critical</Badge>
                      <Badge variant="outline">Verified</Badge>
                    </div>
                  </div>

                  {/* Avatars */}
                  <div className="space-y-2">
                    <Label className="text-xs block">Avatars</Label>
                    <div className="flex gap-4 items-center">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback className="bg-indigo-500 text-white font-semibold">QA</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">Radix avatar with image / text fallbacks</span>
                    </div>
                  </div>

                  {/* Tooltips & Hover Cards */}
                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                    <div className="space-y-1">
                      <Label className="text-xs block">Tooltip Trigger</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">Hover Me</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">This is a fully styled Tooltip</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs block">Hover Card Trigger</Label>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <span className="text-indigo-600 dark:text-indigo-400 underline cursor-pointer text-sm font-semibold">@PW-Core</span>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex justify-between space-x-4">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white">QC</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">PW-Core Ecosystem</h4>
                              <p className="text-xs text-muted-foreground">
                                High-performance testing, documentation, and automation workflows.
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </div>
              </SkeuCard>

              {/* Accordion / Cards */}
              <SkeuCard className="p-6">
                <SectionHeading icon={HelpIcon} title="Accordions & Collapsible Cards" description="Dynamic layout panels" />
                <div className="space-y-4 mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it automated-test friendly?</AccordionTrigger>
                      <AccordionContent>
                        Yes, every key interactive component has unique `data-testid` and ID parameters for Selenium, Playwright, and Cypress.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Can I custom-style components?</AccordionTrigger>
                      <AccordionContent>
                        Absolutely! All component wrappers accept custom Tailwind classes through standard merging logic (`cn`).
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Card className="border border-indigo-500/20 bg-indigo-500/5 mt-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Quick Documentation Card</CardTitle>
                      <CardDescription className="text-xs">Standard UI Card layout</CardDescription>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      This element showcases the standard card structure comprising header, body content, and footer options.
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-2">
                      <span className="text-2xs text-muted-foreground font-mono">v1.0.0</span>
                      <Button variant="ghost" size="xs" className="h-6 text-4xs px-2 text-indigo-500">Read More</Button>
                    </CardFooter>
                  </Card>
                </div>
              </SkeuCard>
            </div>

            {/* Custom Table Component Showcase */}
            <SkeuCard className="p-0 overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <SectionHeading icon={Table2} title="Tabular View (Custom Table Component)" description="Sortable, filterable table utilizing Table UI elements" />
                <Input className="max-w-xs h-9 text-xs" placeholder="Search by name or category..." value={tableFilter} onChange={(e) => { setTableFilter(e.target.value); setTablePage(0); }} />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    {["name", "category", "price", "stock"].map((col) => (
                      <TableHead key={col} onClick={() => handleSort(col)} className="cursor-pointer hover:bg-muted/50 select-none text-xs font-semibold capitalize">
                        {col} {sortCol === col ? (sortDir === 1 ? " ↑" : " ↓") : ""}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-semibold">
                        <TruncatedCell>{row.name}</TruncatedCell>
                      </TableCell>
                      <TableCell>
                        <TruncatedCell>{row.category}</TruncatedCell>
                      </TableCell>
                      <TableCell className="font-mono text-xs">${row.price.toFixed(2)}</TableCell>
                      <TableCell>{row.stock}</TableCell>
                    </TableRow>
                  ))}
                  {pagedData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground text-xs">
                        No matches found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {pageCount > 1 && (
                <div className="p-3 border-t border-border flex items-center justify-between bg-muted/5">
                  <span className="text-xs text-muted-foreground">Page {tablePage + 1} of {pageCount}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setTablePage(Math.max(0, tablePage - 1))} disabled={tablePage === 0}>Prev</Button>
                    <Button variant="outline" size="sm" onClick={() => setTablePage(Math.min(pageCount - 1, tablePage + 1))} disabled={tablePage >= pageCount - 1}>Next</Button>
                  </div>
                </div>
              )}
            </SkeuCard>
          </TabsContent>

          {/* TAB 4: OVERLAYS & DIALOGS */}
          <TabsContent value="overlays" className="space-y-6 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              <SkeuCard className="p-6">
                <SectionHeading icon={Grid} title="Overlays & Popup Dialogs" description="Modals, Drawers, sheets and popovers" />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  
                  {/* Dialog Modals */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">Open Standard Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Interactive Sandbox Dialog</DialogTitle>
                        <DialogDescription>
                          A clean floating modal dialog for custom flows and setups.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Label>Enter comments</Label>
                        <Input placeholder="Say something here..." />
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Drawer */}
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" className="w-full">Open Bottom Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-sm p-6">
                        <DrawerHeader>
                          <DrawerTitle>Bottom Sheets</DrawerTitle>
                          <DrawerDescription>Mobile-first sliding overlay element.</DrawerDescription>
                        </DrawerHeader>
                        <div className="py-4">
                          <p className="text-xs text-muted-foreground">Drag to dismiss or click cancel button.</p>
                        </div>
                        <DrawerFooter>
                          <Button>Agree</Button>
                          <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>

                  {/* Sheets */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full">Open Side Sheet</Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Side Overlay (Sheet)</SheetTitle>
                        <SheetDescription>
                          Displays metadata or submenus on the right side of the viewport.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-6 space-y-4">
                        <Label>Quick Settings</Label>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Enable logging</span>
                          <Switch />
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Alert Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">Trigger Alert Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your test session logs.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete Logs</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </SkeuCard>

              {/* Popovers */}
              <SkeuCard className="p-6">
                <SectionHeading icon={HelpCircle} title="Contextual Popovers" description="Floating trigger-oriented details element" />
                <div className="mt-6 space-y-4">
                  <div className="flex justify-center p-6 border border-dashed rounded-xl bg-muted/20">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">Configure Sandbox</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none text-sm">Dimensions</h4>
                            <p className="text-xs text-muted-foreground">Set default viewport width for testing.</p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="width" className="text-2xs">Width</Label>
                              <Input id="width" defaultValue="100%" className="col-span-2 h-8 text-xs" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="height" className="text-2xs">Height</Label>
                              <Input id="height" defaultValue="Auto" className="col-span-2 h-8 text-xs" />
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </SkeuCard>
            </div>
          </TabsContent>

          {/* TAB 5: ADVANCED & LABS */}
          <TabsContent value="advanced" className="space-y-6 animate-in fade-in duration-300">
            {/* Carousel & Resizable layouts */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Carousel */}
              <SkeuCard className="p-6">
                <SectionHeading icon={Layers} title="Carousel Slider" description="Horizontal scrolling slide view element" />
                <div className="flex justify-center px-10 py-6">
                  <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                      {[1, 2, 3].map((idx) => (
                        <CarouselItem key={idx}>
                          <div className="p-1">
                            <Card className="border border-border bg-card shadow-sm">
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold text-indigo-500">{idx}</span>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </SkeuCard>

              {/* Resizable Panel Layouts */}
              <SkeuCard className="p-6 flex flex-col justify-between">
                <div>
                  <SectionHeading icon={Grid} title="Resizable Panels" description="Custom flex split panes layout" />
                  <div className="h-[200px] border rounded-lg overflow-hidden mt-4 bg-muted/10 font-mono text-xs">
                    <ResizablePanelGroup direction="horizontal">
                      <ResizablePanel defaultSize={30}>
                        <div className="flex h-full items-center justify-center p-4 bg-card">
                          Sidebar
                        </div>
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize={70}>
                        <div className="flex h-full items-center justify-center p-4">
                          Main Content
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>
                </div>
              </SkeuCard>
            </div>

            {/* Uploads / Simulation */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Drag and drop Upload */}
              <SkeuCard className="p-6">
                <SectionHeading icon={Upload} title="Dropzone Uploads" description="Interactive drag-and-drop file uploader" />
                <div className="mt-4">
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragOver ? "border-indigo-500 bg-indigo-500/5" : "border-border hover:border-indigo-500/50"}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                    onClick={() => fileRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Drop files here or click to select</p>
                  </div>
                  <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="flex items-center justify-between text-xs px-3 py-2 rounded-lg border bg-card">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="font-semibold truncate max-w-[150px]">{f.name}</span>
                          </div>
                          <span className="text-2xs text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SkeuCard>

              {/* Dynamic Content / Network Failures */}
              <SkeuCard className="p-6">
                <SectionHeading icon={Sparkles} title="Labs & Simulation" description="Test environments for network anomalies and dynamic DOM elements" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dynamic Content</h3>
                    <Button onClick={loadDynamic} disabled={loadingDynamic} size="sm">
                      {loadingDynamic ? <RefreshCw className="w-3 h-3 mr-2 animate-spin" /> : <Play className="w-3 h-3 mr-2" />} Load Dynamic List
                    </Button>
                    {dynamicItems.length > 0 && (
                      <div className="space-y-1 mt-2">
                        {dynamicItems.map((item, idx) => (
                          <div key={idx} className="text-xs p-2 bg-muted/40 border rounded font-mono">{item}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 border-l border-border pl-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Network Simulation</h3>
                    <Button variant={networkError ? "destructive" : "outline"} onClick={() => setNetworkError(!networkError)} size="sm">
                      {networkError ? "Restore network" : "Simulate 500 error"}
                    </Button>
                    {networkError && (
                      <Alert variant="destructive" className="mt-2 text-2xs p-3">
                        <AlertTitle className="text-2xs font-bold">Network Down</AlertTitle>
                        <AlertDescription className="text-3xs">⚠ ERR_CONNECTION_REFUSED: request timed out.</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </SkeuCard>
            </div>
          </TabsContent>
        </Tabs>
      </TooltipProvider>
    </div>
  );
}