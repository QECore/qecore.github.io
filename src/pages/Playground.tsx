// @ts-nocheck
import React, { useState, useRef } from "react";
import {
  FlaskConical, Type, ToggleLeft, Table2, Upload, Sparkles, Check, ChevronDown, CheckCircle,
  HelpCircle, Play, Sliders, Grid, RefreshCw, Layers, HelpCircle as HelpIcon
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/Dropdown-Menu";
import {
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  MoreHorizontal,
  AlertTriangle,
  Info,
  User,
  Plus
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
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

const dummyLineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const dummyBarData = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 200 },
  { name: "Wed", value: 150 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 70 },
  { name: "Sat", value: 110 },
  { name: "Sun", value: 130 },
];

const t1Data = [
  { id: 1, name: "Alice Vance", email: "alice@example.com", role: "Administrator" },
  { id: 2, name: "Bob Miller", email: "bob@example.com", role: "Manager" },
  { id: 3, name: "Charlie Smith", email: "charlie@example.com", role: "Developer" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Designer" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "DevOps Engineer" },
  { id: 6, name: "Fiona Gallagher", email: "fiona@example.com", role: "Support Specialist" },
  { id: 7, name: "George Costanza", email: "george@example.com", role: "Product Owner" },
  { id: 8, name: "Hannah Abbott", email: "hannah@example.com", role: "QA Engineer" },
];

const t2Data = [
  { id: 1, name: "MacBook Pro M3", category: "Hardware", price: 1999.00, status: "In Stock" },
  { id: 2, name: "iPad Pro 11-inch", category: "Hardware", price: 799.00, status: "Low Stock" },
  { id: 3, name: "Dell 27 Monitor", category: "Peripherals", price: 349.99, status: "In Stock" },
  { id: 4, name: "Logitech MX Master 3S", category: "Peripherals", price: 99.99, status: "Out of Stock" },
  { id: 5, name: "Keychron Q1 Keyboard", category: "Peripherals", price: 189.00, status: "In Stock" },
  { id: 6, name: "USB-C Hub Multiport", category: "Accessories", price: 59.99, status: "In Stock" },
];

const t3Data = [
  { id: 1, name: "E-Commerce Re-platform", owner: "Alex K.", status: "In Progress", progress: 65 },
  { id: 2, name: "SOC2 Compliance Audit", owner: "Sarah T.", status: "Completed", progress: 100 },
  { id: 3, name: "Mobile App V2 Launch", owner: "Marcus L.", status: "Overdue", progress: 90 },
  { id: 4, name: "BI Dashboard Integration", owner: "Elena R.", status: "In Progress", progress: 45 },
  { id: 5, name: "Marketing Website Redesign", owner: "Jane D.", status: "Completed", progress: 100 },
];

const t4Data = [
  { id: 101, title: "Database Migration Script", priority: "High", status: "Danger", dueDate: "2026-06-25", assignee: "David W." },
  { id: 102, title: "API Gateway Rate Limiting", priority: "Medium", status: "Warning", dueDate: "2026-06-28", assignee: "Sophia M." },
  { id: 103, title: "Billing System Webhook Integration", priority: "High", status: "Danger", dueDate: "2026-06-24", assignee: "Robert C." },
  { id: 104, title: "Dark Mode Theme Support", priority: "Low", status: "Safe", dueDate: "2026-07-15", assignee: "Emily B." },
  { id: 105, title: "User Onboarding Walkthrough Plan", priority: "Medium", status: "Safe", dueDate: "2026-07-01", assignee: "Michael K." },
  { id: 106, title: "Security Vulnerability Patching", priority: "High", status: "Danger", dueDate: "2026-06-26", assignee: "Sarah T." },
];

const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"];
const roles = ["Admin", "Manager", "User", "Support"];
const statuses = ["Active", "Inactive", "Pending"];

const t5Data = Array.from({ length: 50 }, (_, i) => {
  const dept = departments[i % departments.length];
  const role = roles[i % roles.length];
  const status = statuses[i % statuses.length];
  const name = [
    "Alice Smith", "Bob Jones", "Charlie Brown", "Diana Prince", "Ethan Hunt",
    "Fiona Gallagher", "George Costanza", "Hannah Abbott", "Ian Malcolm", "Julia Roberts",
    "Kevin Bacon", "Laura Croft", "Michael Scott", "Natalie Portman", "Oscar Wilde",
    "Penelope Cruz", "Quentin Tarantino", "Rachel Green", "Steve Rogers", "Tony Stark",
    "Ursula Buffett", "Victor Frankenstein", "Wendy Darling", "Xavier Charles", "Yolanda Adams",
    "Zachary Levi", "Amy Adams", "Bruce Wayne", "Clark Kent", "Diana Ross",
    "Emma Watson", "Frank Sinatra", "Grace Kelly", "Harry Potter", "Indiana Jones",
    "Jack Sparrow", "Katniss Everdeen", "Luke Skywalker", "Marilyn Monroe", "Neo Anderson",
    "Oliver Twist", "Peter Parker", "Quinn Harley", "Ronald Weasley", "Sherlock Holmes",
    "Thomas Shelby", "Uma Thurman", "Vito Corleone", "Winston Churchill", "Yoda Grandmaster"
  ][i] || `User ${i + 1}`;
  
  return {
    id: 1000 + i,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    department: dept,
    role,
    status
  };
});

const logLevels = ["Info", "Warning", "Error", "Critical"];
const logComponents = ["AuthService", "BillingAPI", "Database", "UI-Gateway", "Worker-Pool"];
const logMessages = [
  "User login success", "Failed login attempt", "Connection timeout on db-primary",
  "API rate limit exceeded", "Webhook delivered successfully", "Cache eviction completed",
  "Out of memory warning", "SSL handshake failed", "Disk space low on volume-1",
  "Payment gateway responding slowly", "Transaction processed successfully", "Configuration reloaded",
  "Session expired for user", "Invalid authorization token received", "Queries took longer than 500ms",
  "Background job worker-3 died", "Spawning new worker instance", "File upload failed: validation error",
  "CSRF token mismatch detected", "Third party endpoint returned 502"
];

const t6Data = Array.from({ length: 50 }, (_, i) => {
  const level = logLevels[i % logLevels.length];
  const component = logComponents[i % logComponents.length];
  const message = logMessages[i % logMessages.length] + ` (Instance ${Math.floor(i / 10)})`;
  return {
    id: 5000 + i,
    timestamp: new Date(2026, 5, 24, 10, i * 2).toLocaleTimeString(),
    level,
    component,
    message
  };
});





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

  // Table 1 states
  const [t1Page, setT1Page] = useState(0);

  // Table 2 states
  const [t2Search, setT2Search] = useState("");
  const [t2SortCol, setT2SortCol] = useState("name");
  const [t2SortDir, setT2SortDir] = useState(1);
  const [t2Page, setT2Page] = useState(0);

  // Table 3 states
  const [t3StatusFilter, setT3StatusFilter] = useState("all");
  const [t3Page, setT3Page] = useState(0);

  // Table 4 states
  const [t4Search, setT4Search] = useState("");
  const [t4StatusFilter, setT4StatusFilter] = useState("all");
  const [t4Selected, setT4Selected] = useState([]);
  const [t4SortCol, setT4SortCol] = useState("dueDate");
  const [t4SortDir, setT4SortDir] = useState(1);
  const [t4Page, setT4Page] = useState(0);

  // Table 5 states (Column-wise filters, 50 records)
  const [t5NameFilter, setT5NameFilter] = useState("");
  const [t5DeptFilter, setT5DeptFilter] = useState("all");
  const [t5RoleFilter, setT5RoleFilter] = useState("all");
  const [t5StatusFilter, setT5StatusFilter] = useState("all");
  const [t5Page, setT5Page] = useState(0);

  // Table 6 states (Multi-Tag Search Filters, 50 records)
  const [t6Filters, setT6Filters] = useState([]);
  const [t6Input, setT6Input] = useState("");
  const [t6Page, setT6Page] = useState(0);



  const handleT2Sort = (col) => {
    if (t2SortCol === col) setT2SortDir(-t2SortDir);
    else { setT2SortCol(col); setT2SortDir(1); }
    setT2Page(0);
  };

  const handleT4Sort = (col) => {
    if (t4SortCol === col) setT4SortDir(-t4SortDir);
    else { setT4SortCol(col); setT4SortDir(1); }
    setT4Page(0);
  };

  const handleToggleSelectAllT4 = (checked) => {
    if (checked) {
      setT4Selected(t4Data.map(item => item.id));
    } else {
      setT4Selected([]);
    }
  };

  const handleToggleSelectRowT4 = (id, checked) => {
    if (checked) {
      setT4Selected(prev => [...prev, id]);
    } else {
      setT4Selected(prev => prev.filter(item => item !== id));
    }
  };

  const handleT6InputKeyDown = (e) => {
    if (e.key === "Enter" && t6Input.trim() !== "") {
      const tag = t6Input.trim().toLowerCase();
      if (!t6Filters.includes(tag)) {
        setT6Filters(prev => [...prev, tag]);
      }
      setT6Input("");
      setT6Page(0);
      e.preventDefault();
    }
  };

  const handleRemoveT6Filter = (tag) => {
    setT6Filters(prev => prev.filter(t => t !== tag));
    setT6Page(0);
  };

  const handleClearT6Filters = () => {
    setT6Filters([]);
    setT6Page(0);
  };


  // Table 1 Computed
  const t1Filtered = t1Data;
  const t1PageSize = 3;
  const t1PageCount = Math.ceil(t1Filtered.length / t1PageSize);
  const t1Paged = t1Filtered.slice(t1Page * t1PageSize, (t1Page + 1) * t1PageSize);

  // Table 2 Computed
  const t2Filtered = t2Data.filter(item =>
    item.name.toLowerCase().includes(t2Search.toLowerCase()) ||
    item.category.toLowerCase().includes(t2Search.toLowerCase())
  );
  const t2Sorted = [...t2Filtered].sort((a, b) => {
    const valA = a[t2SortCol];
    const valB = b[t2SortCol];
    if (typeof valA === "string") return valA.localeCompare(valB) * t2SortDir;
    return (valA - valB) * t2SortDir;
  });
  const t2PageSize = 3;
  const t2PageCount = Math.ceil(t2Sorted.length / t2PageSize);
  const t2Paged = t2Sorted.slice(t2Page * t2PageSize, (t2Page + 1) * t2PageSize);

  // Table 3 Computed
  const t3Filtered = t3Data.filter(item =>
    t3StatusFilter === "all" ||
    item.status.toLowerCase().replace(/\s+/g, "") === t3StatusFilter.toLowerCase()
  );
  const t3PageSize = 3;
  const t3PageCount = Math.ceil(t3Filtered.length / t3PageSize);
  const t3Paged = t3Filtered.slice(t3Page * t3PageSize, (t3Page + 1) * t3PageSize);

  // Table 4 Computed
  const t4Filtered = t4Data.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(t4Search.toLowerCase()) ||
                        item.assignee.toLowerCase().includes(t4Search.toLowerCase());
    const matchFilter = t4StatusFilter === "all" ||
                        item.priority.toLowerCase() === t4StatusFilter.toLowerCase() ||
                        item.status.toLowerCase() === t4StatusFilter.toLowerCase();
    return matchSearch && matchFilter;
  });
  const t4Sorted = [...t4Filtered].sort((a, b) => {
    const valA = a[t4SortCol];
    const valB = b[t4SortCol];
    return valA.localeCompare(valB) * t4SortDir;
  });
  const t4PageSize = 3;
  const t4PageCount = Math.ceil(t4Sorted.length / t4PageSize);
  const t4Paged = t4Sorted.slice(t4Page * t4PageSize, (t4Page + 1) * t4PageSize);

  // Table 5 Computed (Column-wise filters, 50 records)
  const t5Filtered = t5Data.filter(item => {
    const matchName = item.name.toLowerCase().includes(t5NameFilter.toLowerCase()) ||
                      item.email.toLowerCase().includes(t5NameFilter.toLowerCase());
    const matchDept = t5DeptFilter === "all" || item.department === t5DeptFilter;
    const matchRole = t5RoleFilter === "all" || item.role === t5RoleFilter;
    const matchStatus = t5StatusFilter === "all" || item.status === t5StatusFilter;
    return matchName && matchDept && matchRole && matchStatus;
  });
  const t5PageSize = 5;
  const t5PageCount = Math.ceil(t5Filtered.length / t5PageSize);
  const t5Paged = t5Filtered.slice(t5Page * t5PageSize, (t5Page + 1) * t5PageSize);

  // Table 6 Computed (Multi-Tag Search Filters, 50 records)
  const t6Filtered = t6Data.filter(item => {
    if (t6Filters.length === 0) return true;
    return t6Filters.every(filter =>
      item.message.toLowerCase().includes(filter) ||
      item.level.toLowerCase().includes(filter) ||
      item.component.toLowerCase().includes(filter)
    );
  });
  const t6PageSize = 5;
  const t6PageCount = Math.ceil(t6Filtered.length / t6PageSize);
  const t6Paged = t6Filtered.slice(t6Page * t6PageSize, (t6Page + 1) * t6PageSize);




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
        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 p-1 bg-muted/50 rounded-xl h-auto md:h-12 gap-1">
            <TabsTrigger id="tab-trigger-charts" data-test-id="tab-trigger-charts" data-testid="tab-trigger-charts" value="charts" className="text-xs sm:text-sm font-medium rounded-lg h-10">Charts</TabsTrigger>
            <TabsTrigger id="tab-trigger-tables" data-test-id="tab-trigger-tables" data-testid="tab-trigger-tables" value="tables" className="text-xs sm:text-sm font-medium rounded-lg h-10">Tables</TabsTrigger>
            <TabsTrigger id="tab-trigger-inputs" data-test-id="tab-trigger-inputs" data-testid="tab-trigger-inputs" value="inputs" className="text-xs sm:text-sm font-medium rounded-lg h-10">Inputs & Selection</TabsTrigger>
            <TabsTrigger id="tab-trigger-buttons" data-test-id="tab-trigger-buttons" data-testid="tab-trigger-buttons" value="buttons" className="text-xs sm:text-sm font-medium rounded-lg h-10">Buttons & Actions</TabsTrigger>
            <TabsTrigger id="tab-trigger-display" data-test-id="tab-trigger-display" data-testid="tab-trigger-display" value="display" className="text-xs sm:text-sm font-medium rounded-lg h-10">Data & Display</TabsTrigger>
            <TabsTrigger id="tab-trigger-overlays" data-test-id="tab-trigger-overlays" data-testid="tab-trigger-overlays" value="overlays" className="text-xs sm:text-sm font-medium rounded-lg h-10">Dialogs & Sheets</TabsTrigger>
            <TabsTrigger id="tab-trigger-advanced" data-test-id="tab-trigger-advanced" data-testid="tab-trigger-advanced" value="advanced" className="text-xs sm:text-sm font-medium rounded-lg h-10">Advanced & Labs</TabsTrigger>
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
                    <Input id="playground-text" data-test-id="text-input" data-testid="text-input" placeholder="Enter text..." value={textVal} onChange={(e) => setTextVal(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="playground-password">Password</Label>
                    <Input id="playground-password" type="password" data-test-id="password-input" data-testid="password-input" placeholder="••••••••" value={passwordVal} onChange={(e) => setPasswordVal(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="playground-number">Number</Label>
                      <Input id="playground-number" type="number" data-test-id="number-input" data-testid="number-input" placeholder="0" value={numberVal} onChange={(e) => setNumberVal(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="playground-switch">Switch Toggle</Label>
                      <div className="flex items-center space-x-2 h-10">
                        <Switch id="playground-switch" data-test-id="switch-input" data-testid="switch-input" checked={switchVal} onCheckedChange={setSwitchVal} />
                        <span className="text-xs text-muted-foreground">{switchVal ? "ON" : "OFF"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="playground-textarea">Textarea</Label>
                    <Textarea id="playground-textarea" data-test-id="textarea-input" data-testid="textarea-input" placeholder="Write something..." value={textareaVal} onChange={(e) => setTextareaVal(e.target.value)} className="min-h-[80px]" />
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
                      <InputOTP id="playground-otp" data-test-id="otp-input" data-testid="otp-input" maxLength={6} value={otpVal} onChange={setOtpVal}>
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
                    <Slider id="playground-slider" data-test-id="slider-input" data-testid="slider-input" value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Checkbox Group</Label>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox id="terms" data-test-id="checkbox-terms" data-testid="checkbox-terms" checked={checkboxVal} onCheckedChange={setCheckboxVal} />
                        <Label htmlFor="terms" className="text-xs font-normal cursor-pointer select-none">Accept terms</Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Dropdown (Select)</Label>
                      <Select value={dropdownVal} onValueChange={setDropdownVal}>
                        <SelectTrigger id="playground-select" data-test-id="select-input" data-testid="select-input" className="w-full">
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
                      <RadioGroup id="playground-radio" data-test-id="radio-group" data-testid="radio-group" value={radioVal} onValueChange={setRadioVal} className="space-y-1">
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
                            <Checkbox id={`multi-${opt}`} data-test-id={`checkbox-multi-${opt.toLowerCase()}`} data-testid={`checkbox-multi-${opt.toLowerCase()}`} checked={multiSelect.includes(opt)} onCheckedChange={() => toggleMulti(opt)} />
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
                        <Button id="playground-collapsible-trigger" data-test-id="collapsible-trigger" data-testid="collapsible-trigger" variant="ghost" size="sm" className="w-9 p-0">
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
                      <Button id="playground-progress-minus" data-test-id="progress-minus" data-testid="progress-minus" variant="outline" size="sm" onClick={() => setProgressVal(Math.max(0, progressVal - 10))}>-10%</Button>
                      <Button id="playground-progress-plus" data-test-id="progress-plus" data-testid="progress-plus" variant="outline" size="sm" onClick={() => setProgressVal(Math.min(100, progressVal + 10))}>+10%</Button>
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
                    <Button id="btn-variant-default" data-test-id="btn-variant-default" data-testid="btn-variant-default" variant="default">Default Button</Button>
                    <Button id="btn-variant-secondary" data-test-id="btn-variant-secondary" data-testid="btn-variant-secondary" variant="secondary">Secondary</Button>
                    <Button id="btn-variant-outline" data-test-id="btn-variant-outline" data-testid="btn-variant-outline" variant="outline">Outline Variant</Button>
                    <Button id="btn-variant-destructive" data-test-id="btn-variant-destructive" data-testid="btn-variant-destructive" variant="destructive">Destructive Action</Button>
                    <Button id="btn-variant-ghost" data-test-id="btn-variant-ghost" data-testid="btn-variant-ghost" variant="ghost">Ghost Button</Button>
                    <Button id="btn-variant-link" data-test-id="btn-variant-link" data-testid="btn-variant-link" variant="link">Link Style</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-4 text-indigo-500">Toggles & Toggle Groups</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Toggle id="playground-toggle" data-test-id="toggle-btn" data-testid="toggle-btn" aria-label="Toggle bold" pressed={toggleActive} onPressedChange={setToggleActive}>
                        <Check className="h-4 w-4 mr-2" /> {toggleActive ? "Active" : "Inactive"}
                      </Toggle>
                      <span className="text-xs text-muted-foreground">Single toggle state</span>
                    </div>

                    <div className="space-y-2">
                      <Label>Alignment Toggle Group</Label>
                      <ToggleGroup type="single" value={toggleGroupVal} onValueChange={(val) => val && setToggleGroupVal(val)}>
                        <ToggleGroupItem id="toggle-align-left" data-test-id="toggle-align-left" data-testid="toggle-align-left" value="left" aria-label="Align left">Left Align</ToggleGroupItem>
                        <ToggleGroupItem id="toggle-align-center" data-test-id="toggle-align-center" data-testid="toggle-align-center" value="center" aria-label="Align center">Center Align</ToggleGroupItem>
                        <ToggleGroupItem id="toggle-align-right" data-test-id="toggle-align-right" data-testid="toggle-align-right" value="right" aria-label="Align right">Right Align</ToggleGroupItem>
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
              
              <Table id="display-table" data-test-id="display-table" data-testid="display-table">
                <TableHeader>
                  <TableRow>
                    {["name", "category", "price", "stock"].map((col) => (
                      <TableHead key={col} id={`sort-playground-${col}`} data-test-id={`sort-playground-${col}`} data-testid={`sort-playground-${col}`} onClick={() => handleSort(col)} className="cursor-pointer hover:bg-muted/50 select-none text-xs font-semibold capitalize">
                        {col} {sortCol === col ? (sortDir === 1 ? " ↑" : " ↓") : ""}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedData.map((row) => (
                    <TableRow key={row.id} id={`playground-row-${row.id}`} data-test-id={`playground-row-${row.id}`} data-testid={`playground-row-${row.id}`}>
                      <TableCell id={`playground-cell-${row.id}-name`} data-test-id={`playground-cell-${row.id}-name`} data-testid={`playground-cell-${row.id}-name`} className="font-semibold">
                        <TruncatedCell>{row.name}</TruncatedCell>
                      </TableCell>
                      <TableCell id={`playground-cell-${row.id}-category`} data-test-id={`playground-cell-${row.id}-category`} data-testid={`playground-cell-${row.id}-category`}>
                        <TruncatedCell>{row.category}</TruncatedCell>
                      </TableCell>
                      <TableCell id={`playground-cell-${row.id}-price`} data-test-id={`playground-cell-${row.id}-price`} data-testid={`playground-cell-${row.id}-price`} className="font-mono text-xs">${row.price.toFixed(2)}</TableCell>
                      <TableCell id={`playground-cell-${row.id}-stock`} data-test-id={`playground-cell-${row.id}-stock`} data-testid={`playground-cell-${row.id}-stock`}>{row.stock}</TableCell>
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

          {/* TAB 7: TABLES SHOWCASE */}
          <TabsContent value="tables" className="space-y-8 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* TABLE 1: Basic Table with Pagination */}
              <SkeuCard className="p-6">
                <SectionHeading icon={Table2} title="1. Basic Table" description="Simple user directory with basic pagination" />
                <div className="mt-4 border rounded-xl overflow-hidden bg-card">
                  <Table id="basic-table" data-test-id="basic-table" data-testid="basic-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {t1Paged.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-semibold">{row.name}</TableCell>
                          <TableCell className="font-mono text-xs">{row.email}</TableCell>
                          <TableCell className="text-muted-foreground">{row.role}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="p-3 border-t border-border flex items-center justify-between bg-muted/10 text-xs">
                    <span className="text-muted-foreground">Page {t1Page + 1} of {t1PageCount}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setT1Page(prev => Math.max(0, prev - 1))} disabled={t1Page === 0}>Prev</Button>
                      <Button variant="outline" size="sm" onClick={() => setT1Page(prev => Math.min(t1PageCount - 1, prev + 1))} disabled={t1Page >= t1PageCount - 1}>Next</Button>
                    </div>
                  </div>
                </div>
              </SkeuCard>

              {/* TABLE 2: Interactive Table with Search & Sort */}
              <SkeuCard className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <SectionHeading icon={Table2} title="2. Search & Sort Table" description="Filter by name/category and sort columns" />
                  <div className="relative max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input className="pl-8 h-8 text-xs w-[180px]" placeholder="Search catalog..." value={t2Search} onChange={(e) => { setT2Search(e.target.value); setT2Page(0); }} />
                  </div>
                </div>
                <div className="border rounded-xl overflow-hidden bg-card">
                  <Table id="sort-table" data-test-id="sort-table" data-testid="sort-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="cursor-pointer select-none hover:bg-muted/50" onClick={() => handleT2Sort("name")}>
                          Name {t2SortCol === "name" ? (t2SortDir === 1 ? "↑" : "↓") : ""}
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="cursor-pointer select-none hover:bg-muted/50" onClick={() => handleT2Sort("price")}>
                          Price {t2SortCol === "price" ? (t2SortDir === 1 ? "↑" : "↓") : ""}
                        </TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {t2Paged.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-semibold">{row.name}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell className="font-mono">${row.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={row.status === "In Stock" ? "outline" : "secondary"} className={row.status === "In Stock" ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10" : ""}>
                              {row.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      {t2Paged.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-muted-foreground text-xs">No records found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className="p-3 border-t border-border flex items-center justify-between bg-muted/10 text-xs">
                    <span className="text-muted-foreground">Page {t2Page + 1} of {t2PageCount || 1}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setT2Page(prev => Math.max(0, prev - 1))} disabled={t2Page === 0}>Prev</Button>
                      <Button variant="outline" size="sm" onClick={() => setT2Page(prev => Math.min(t2PageCount - 1, prev + 1))} disabled={t2Page >= t2PageCount - 1 || t2PageCount === 0}>Next</Button>
                    </div>
                  </div>
                </div>
              </SkeuCard>

              {/* TABLE 3: Complex Table with Icons, Status Pills, and Cell Dropdowns */}
              <SkeuCard className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <SectionHeading icon={Table2} title="3. Status & Dropdown Table" description="Status pills, user icons, and action menus" />
                  <Select value={t3StatusFilter} onValueChange={(val) => { setT3StatusFilter(val); setT3Page(0); }}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="inprogress">In Progress</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border rounded-xl overflow-hidden bg-card">
                  <Table id="status-table" data-test-id="status-table" data-testid="status-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Lead</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {t3Paged.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-semibold">{row.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                                {row.owner.charAt(0)}
                              </div>
                              <span className="text-xs text-muted-foreground">{row.owner}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              row.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                              row.status === "In Progress" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                              "bg-destructive/10 text-destructive border-destructive/20"
                            } variant="outline">
                              {row.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-7 w-7 p-0 ml-auto">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="text-xs">
                                <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toast({ title: `Viewing ${row.name}` })}>View Details</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast({ title: `Updating ${row.name}` })}>Edit Project</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      {t3Paged.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-muted-foreground text-xs">No projects match filter.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className="p-3 border-t border-border flex items-center justify-between bg-muted/10 text-xs">
                    <span className="text-muted-foreground">Page {t3Page + 1} of {t3PageCount || 1}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setT3Page(prev => Math.max(0, prev - 1))} disabled={t3Page === 0}>Prev</Button>
                      <Button variant="outline" size="sm" onClick={() => setT3Page(prev => Math.min(t3PageCount - 1, prev + 1))} disabled={t3Page >= t3PageCount - 1 || t3PageCount === 0}>Next</Button>
                    </div>
                  </div>
                </div>
              </SkeuCard>

              {/* TABLE 4: Advanced Interactive Table with Sort Indicators (Raise & Down arrows), Multi-Select checkboxes, Inline Action Dropdowns, Advanced Filters, and Status Badge */}
              <SkeuCard className="p-6 col-span-1 md:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <SectionHeading icon={Table2} title="4. Advanced Task Board" description="Sorting with raise/down arrows, checkboxes, and nested action menus" />
                    {t4Selected.length > 0 && (
                      <p className="text-xs text-indigo-500 font-medium mt-1">
                        {t4Selected.length} row(s) selected for bulk actions
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input className="pl-8 h-8 text-xs w-[160px]" placeholder="Search tasks..." value={t4Search} onChange={(e) => { setT4Search(e.target.value); setT4Page(0); }} />
                    </div>
                    <Select value={t4StatusFilter} onValueChange={(val) => { setT4StatusFilter(val); setT4Page(0); }}>
                      <SelectTrigger className="w-[120px] h-8 text-xs">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    {t4Selected.length > 0 && (
                      <Button size="sm" className="h-8 text-xs" variant="destructive" onClick={() => {
                        toast({ title: `Bulk deleted ${t4Selected.length} tasks` });
                        setT4Selected([]);
                      }}>
                        Bulk Delete
                      </Button>
                    )}
                  </div>
                </div>
                <div className="border rounded-xl overflow-hidden bg-card">
                  <Table id="advanced-table" data-test-id="advanced-table" data-testid="advanced-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 text-center">
                          <Checkbox checked={t4Selected.length === t4Paged.length && t4Paged.length > 0} onCheckedChange={(val) => handleToggleSelectAllT4(!!val)} />
                        </TableHead>
                        <TableHead className="cursor-pointer select-none hover:bg-muted/50" onClick={() => handleT4Sort("title")}>
                          <div className="flex items-center gap-1">
                            Title
                            <div className="flex flex-col">
                              <ChevronUp className={`w-3 h-3 -mb-1 ${t4SortCol === "title" && t4SortDir === 1 ? "text-indigo-600 font-bold" : "text-muted-foreground/30"}`} />
                              <ChevronDown className={`w-3 h-3 ${t4SortCol === "title" && t4SortDir === -1 ? "text-indigo-600 font-bold" : "text-muted-foreground/30"}`} />
                            </div>
                          </div>
                        </TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="cursor-pointer select-none hover:bg-muted/50" onClick={() => handleT4Sort("dueDate")}>
                          <div className="flex items-center gap-1">
                            Due Date
                            <div className="flex flex-col">
                              <ChevronUp className={`w-3 h-3 -mb-1 ${t4SortCol === "dueDate" && t4SortDir === 1 ? "text-indigo-600 font-bold" : "text-muted-foreground/30"}`} />
                              <ChevronDown className={`w-3 h-3 ${t4SortCol === "dueDate" && t4SortDir === -1 ? "text-indigo-600 font-bold" : "text-muted-foreground/30"}`} />
                            </div>
                          </div>
                        </TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right w-20">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {t4Paged.map((row) => (
                        <TableRow key={row.id} className={t4Selected.includes(row.id) ? "bg-indigo-500/5 hover:bg-indigo-500/10" : ""}>
                          <TableCell className="text-center">
                            <Checkbox checked={t4Selected.includes(row.id)} onCheckedChange={(val) => handleToggleSelectRowT4(row.id, !!val)} />
                          </TableCell>
                          <TableCell className="font-semibold">{row.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              row.priority === "High" ? "border-rose-500/30 text-rose-500 bg-rose-500/5" :
                              row.priority === "Medium" ? "border-amber-500/30 text-amber-500 bg-amber-500/5" :
                              "border-slate-500/30 text-slate-500 bg-slate-500/5"
                            }>
                              {row.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{row.dueDate}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{row.assignee}</TableCell>
                          <TableCell>
                            <span id={row.status} className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold ${
                              row.status === "Danger" ? "bg-rose-500/10 text-rose-500" :
                              row.status === "Warning" ? "bg-amber-500/10 text-amber-500" :
                              "bg-emerald-500/10 text-emerald-500"
                            }`}>
                              {row.status === "Danger" ? "Danger" : row.status === "Warning" ? "Warning" : "Safe"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-7 w-7 p-0 ml-auto">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="text-xs">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toast({ title: `Editing Task: ${row.title}` })}>Edit Task</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast({ title: `Completed Task: ${row.title}` })}>Mark Completed</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => {
                                  toast({ title: `Deleted Task: ${row.title}` });
                                  setT4Selected(prev => prev.filter(id => id !== row.id));
                                }}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      {t4Paged.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground text-xs">No tasks match selected filter criteria.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className="p-3 border-t border-border flex items-center justify-between bg-muted/10 text-xs">
                    <span className="text-muted-foreground">Page {t4Page + 1} of {t4PageCount || 1}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setT4Page(prev => Math.max(0, prev - 1))} disabled={t4Page === 0}>Prev</Button>
                      <Button variant="outline" size="sm" onClick={() => setT4Page(prev => Math.min(t4PageCount - 1, prev + 1))} disabled={t4Page >= t4PageCount - 1 || t4PageCount === 0}>Next</Button>
                    </div>
                  </div>
                </div>
              </SkeuCard>

              {/* TABLE 5: Table with Column-wise filters (50 records) */}
              <SkeuCard className="p-6 col-span-1 md:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <SectionHeading icon={Table2} title="5. Directory with Column Filters (50 Records)" description="Table showcasing filters on every individual column" />
                  <div className="text-xs text-muted-foreground font-mono bg-muted/30 px-3 py-1.5 rounded-lg border">
                    Filtered: {t5Filtered.length} / 50 records
                  </div>
                </div>
                <div className="border rounded-xl overflow-hidden bg-card">
                  <Table id="filter-table" data-test-id="filter-table" data-testid="filter-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div className="space-y-1.5 py-1">
                            <span className="font-semibold text-xs block">Name / Email</span>
                            <Input className="h-7 text-xs w-[140px] px-2 font-normal" placeholder="Filter name..." value={t5NameFilter} onChange={(e) => { setT5NameFilter(e.target.value); setT5Page(0); }} />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="space-y-1.5 py-1">
                            <span className="font-semibold text-xs block">Department</span>
                            <Select value={t5DeptFilter} onValueChange={(val) => { setT5DeptFilter(val); setT5Page(0); }}>
                              <SelectTrigger className="w-[120px] h-7 text-[11px] font-normal px-2">
                                <SelectValue placeholder="All" />
                              </SelectTrigger>
                              <SelectContent className="text-xs">
                                <SelectItem value="all">All Depts</SelectItem>
                                {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="space-y-1.5 py-1">
                            <span className="font-semibold text-xs block">Role</span>
                            <Select value={t5RoleFilter} onValueChange={(val) => { setT5RoleFilter(val); setT5Page(0); }}>
                              <SelectTrigger className="w-[110px] h-7 text-[11px] font-normal px-2">
                                <SelectValue placeholder="All" />
                              </SelectTrigger>
                              <SelectContent className="text-xs">
                                <SelectItem value="all">All Roles</SelectItem>
                                {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="space-y-1.5 py-1">
                            <span className="font-semibold text-xs block">Status</span>
                            <Select value={t5StatusFilter} onValueChange={(val) => { setT5StatusFilter(val); setT5Page(0); }}>
                              <SelectTrigger className="w-[110px] h-7 text-[11px] font-normal px-2">
                                <SelectValue placeholder="All" />
                              </SelectTrigger>
                              <SelectContent className="text-xs">
                                <SelectItem value="all">All Status</SelectItem>
                                {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {t5Paged.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-xs">{row.name}</p>
                              <p className="text-3xs text-muted-foreground font-mono">{row.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">{row.department}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{row.role}</TableCell>
                          <TableCell>
                            <Badge className={
                              row.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                              row.status === "Inactive" ? "bg-destructive/10 text-destructive border-destructive/20" :
                              "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            } variant="outline">
                              {row.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      {t5Paged.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-10 text-muted-foreground text-xs">No records found matching filters.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className="p-3 border-t border-border flex items-center justify-between bg-muted/10 text-xs">
                    <span className="text-muted-foreground">Page {t5Page + 1} of {t5PageCount || 1}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setT5Page(prev => Math.max(0, prev - 1))} disabled={t5Page === 0}>Prev</Button>
                      <Button variant="outline" size="sm" onClick={() => setT5Page(prev => Math.min(t5PageCount - 1, prev + 1))} disabled={t5Page >= t5PageCount - 1 || t5PageCount === 0}>Next</Button>
                    </div>
                  </div>
                </div>
              </SkeuCard>

              {/* TABLE 6: Search Text Filters with Tag Pills inside input box */}
              <SkeuCard className="p-6 col-span-1 md:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <SectionHeading icon={Table2} title="6. Log Explorer (Multi-Tag Search)" description="Type search query and press Enter to lock it as a filter tag" />
                    {t6Filters.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {t6Filters.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px] py-0.5 px-2 bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 flex items-center gap-1">
                            {tag}
                            <button className="text-indigo-600 hover:text-indigo-900 text-[8px] font-bold" onClick={() => handleRemoveT6Filter(tag)}>✕</button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative flex items-center w-full max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      className="pl-8 pr-10 h-9 text-xs"
                      placeholder="Type filter and press Enter..."
                      value={t6Input}
                      onChange={(e) => setT6Input(e.target.value)}
                      onKeyDown={handleT6InputKeyDown}
                    />
                    {t6Filters.length > 0 && (
                      <span
                        className="absolute right-2.5 bg-indigo-600 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold shadow-sm cursor-pointer hover:bg-indigo-700 select-none animate-in scale-in duration-200"
                        onClick={handleClearT6Filters}
                        title="Clear all filters"
                      >
                        {t6Filters.length}
                      </span>
                    )}
                  </div>
                </div>
                <div className="border rounded-xl overflow-hidden bg-card">
                  <Table id="tag-table" data-test-id="tag-table" data-testid="tag-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Timestamp</TableHead>
                        <TableHead className="w-[100px]">Level</TableHead>
                        <TableHead className="w-[140px]">Component</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {t6Paged.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-mono text-2xs text-muted-foreground">{row.timestamp}</TableCell>
                          <TableCell>
                            <Badge className={
                              row.level === "Critical" || row.level === "Error" ? "bg-rose-500/10 text-rose-500 border-rose-500/20" :
                              row.level === "Warning" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                              "bg-slate-500/10 text-slate-500 border-slate-500/20"
                            } variant="outline">
                              {row.level}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-xs">{row.component}</TableCell>
                          <TableCell className="font-mono text-2xs truncate max-w-md">{row.message}</TableCell>
                        </TableRow>
                      ))}
                      {t6Paged.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-10 text-muted-foreground text-xs">No logs match active filter tags.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className="p-3 border-t border-border flex items-center justify-between bg-muted/10 text-xs">
                    <span className="text-muted-foreground">Page {t6Page + 1} of {t6PageCount || 1}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setT6Page(prev => Math.max(0, prev - 1))} disabled={t6Page === 0}>Prev</Button>
                      <Button variant="outline" size="sm" onClick={() => setT6Page(prev => Math.min(t6PageCount - 1, prev + 1))} disabled={t6Page >= t6PageCount - 1 || t6PageCount === 0}>Next</Button>
                    </div>
                  </div>
                </div>
              </SkeuCard>

            </div>
          </TabsContent>

          {/* TAB 6: CHARTS SHOWCASE */}
          <TabsContent value="charts" className="space-y-6 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Active Line Chart */}
              <SkeuCard className="p-6 relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20" id="Safe">
                    Safe
                  </Badge>
                </div>
                <SectionHeading icon={Sliders} title="Active Line Chart" description="Live telemetry line chart view" />
                <div className="h-[300px] w-full mt-4" data-test-id="active-line-chart" data-testid="active-line-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dummyLineData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                      <XAxis dataKey="name" className="fill-muted-foreground text-xs" />
                      <YAxis className="fill-muted-foreground text-xs" />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} labelStyle={{ color: 'hsl(var(--foreground))' }} />
                      <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </SkeuCard>

              {/* Inactive Line Chart */}
              <SkeuCard className="p-6 relative opacity-60 grayscale-[30%]">
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20" id="Safe">
                    Safe
                  </Badge>
                </div>
                <SectionHeading icon={Sliders} title="Inactive Line Chart" description="Offline telemetry line chart view" />
                <div className="h-[300px] w-full mt-4" data-test-id="inactive-line-chart" data-testid="inactive-line-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dummyLineData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/10" />
                      <XAxis dataKey="name" className="fill-muted-foreground/30 text-xs" />
                      <YAxis className="fill-muted-foreground/30 text-xs" />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} labelStyle={{ color: 'hsl(var(--foreground))' }} />
                      <Line type="monotone" dataKey="value" stroke="#94a3b8" strokeWidth={2} dot={false} activeDot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </SkeuCard>

              {/* Active Bar Chart */}
              <SkeuCard className="p-6 relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20" id="Danger">
                    Danger
                  </Badge>
                </div>
                <SectionHeading icon={Grid} title="Active Bar Chart" description="Live resource usage bar chart view" />
                <div className="h-[300px] w-full mt-4" data-test-id="active-bar-chart" data-testid="active-bar-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dummyBarData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                      <XAxis dataKey="name" className="fill-muted-foreground text-xs" />
                      <YAxis className="fill-muted-foreground text-xs" />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} labelStyle={{ color: 'hsl(var(--foreground))' }} />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SkeuCard>

              {/* Inactive Bar Chart */}
              <SkeuCard className="p-6 relative opacity-60 grayscale-[30%]">
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20" id="Danger">
                    Danger
                  </Badge>
                </div>
                <SectionHeading icon={Grid} title="Inactive Bar Chart" description="Offline resource usage bar chart view" />
                <div className="h-[300px] w-full mt-4" data-test-id="inactive-bar-chart" data-testid="inactive-bar-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dummyBarData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/10" />
                      <XAxis dataKey="name" className="fill-muted-foreground/30 text-xs" />
                      <YAxis className="fill-muted-foreground/30 text-xs" />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} labelStyle={{ color: 'hsl(var(--foreground))' }} />
                      <Bar dataKey="value" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SkeuCard>

            </div>
          </TabsContent>
        </Tabs>
      </TooltipProvider>
    </div>
  );
}