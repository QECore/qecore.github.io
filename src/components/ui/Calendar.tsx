import * as React from "react"
import { DayPicker, useDayPicker, useNavigation, useDayRender, DayProps, CaptionLabel, CaptionProps, CaptionDropdowns } from "react-day-picker"
import { isSameMonth } from "date-fns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"

const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/**
 * Custom dropdown component for react-day-picker.
 * When `name="months"`, re-renders the month options with short 3-letter names.
 */
function CalendarDropdown({
  name,
  value,
  onChange,
  children,
  style,
  className,
  ...rest
}: {
  name?: string
  value?: string | number
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  children?: React.ReactNode
  caption?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}) {
  const isMonthDropdown = name === "months"

  const options = React.Children.toArray(children) as React.ReactElement[]
  let dropdownItems = options.map((child) => {
    if (!React.isValidElement(child)) return null
    return {
      value: String(child.props.value),
      label: String(child.props.children),
    }
  }).filter(Boolean) as Array<{ value: string; label: string }>

  if (isMonthDropdown) {
    dropdownItems = SHORT_MONTHS.map((label, idx) => ({
      value: String(idx),
      label,
    }))
  }

  const handleChange = (newValue: string) => {
    if (onChange) {
      const mockEvent = {
        target: {
          name,
          value: newValue,
        },
      } as React.ChangeEvent<HTMLSelectElement>
      onChange(mockEvent)
    }
  }

  return (
    <Select value={String(value)} onValueChange={handleChange}>
      <SelectTrigger className="h-7 py-0.5 px-2 text-xs font-semibold w-auto min-w-[70px] bg-background border border-input rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-ring gap-1 [&>span]:line-clamp-1 [&>svg]:opacity-50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-[160px] overflow-y-auto min-w-[70px] z-50">
        {dropdownItems.map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-xs py-1 pl-2 pr-6">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function CustomDay(props: DayProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef)

  if (dayRender.isHidden) {
    return <div role="gridcell" />
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />
  }

  // Format date as YYYY-MM-DD
  const dateStr = props.date.toISOString().split("T")[0]
  const testId = `day-${dateStr}`

  return (
    <button
      name="day"
      ref={buttonRef}
      id={testId}
      data-test-id={testId}
      data-testid={testId}
      {...dayRender.buttonProps}
    />
  )
}

function CustomCaption(props: CaptionProps) {
  const { classNames, disableNavigation, styles, captionLayout, components } = useDayPicker()
  const { previousMonth, nextMonth, goToMonth, displayMonths } = useNavigation()

  const CaptionLabelComponent = components?.CaptionLabel ?? CaptionLabel

  const displayIndex = displayMonths.findIndex((month) =>
    isSameMonth(props.displayMonth, month)
  )

  const isFirst = displayIndex === 0
  const isLast = displayIndex === displayMonths.length - 1

  const hideNext = !nextMonth || (displayMonths.length > 1 && (isFirst || !isLast))
  const hidePrevious = !previousMonth || (displayMonths.length > 1 && (isLast || !isFirst))

  const handlePreviousClick = () => {
    if (previousMonth) goToMonth(previousMonth)
  }

  const handleNextClick = () => {
    if (nextMonth) goToMonth(nextMonth)
  }

  const renderNavigation = () => {
    if (disableNavigation) return null
    return (
      <div className={classNames.nav} style={styles.nav}>
        {!hidePrevious && (
          <button
            type="button"
            id="calendar-prev"
            data-test-id="calendar-prev"
            data-testid="calendar-prev"
            className={cn(classNames.nav_button, classNames.nav_button_previous, "flex items-center justify-center")}
            style={styles.nav_button_previous}
            disabled={!previousMonth}
            onClick={handlePreviousClick}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {!hideNext && (
          <button
            type="button"
            id="calendar-next"
            data-test-id="calendar-next"
            data-testid="calendar-next"
            className={cn(classNames.nav_button, classNames.nav_button_next, "flex items-center justify-center")}
            style={styles.nav_button_next}
            disabled={!nextMonth}
            onClick={handleNextClick}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }

  if (disableNavigation) {
    return (
      <div className={classNames.caption} style={styles.caption}>
        <CaptionLabelComponent id={props.id} displayMonth={props.displayMonth} />
      </div>
    )
  }

  if (captionLayout === "dropdown") {
    return (
      <div className={classNames.caption} style={styles.caption}>
        <CaptionDropdowns displayMonth={props.displayMonth} id={props.id} />
      </div>
    )
  }

  if (captionLayout === "dropdown-buttons") {
    return (
      <div className={classNames.caption} style={styles.caption}>
        <CaptionDropdowns
          displayMonth={props.displayMonth}
          displayIndex={props.displayIndex}
          id={props.id}
        />
        {renderNavigation()}
      </div>
    )
  }

  return (
    <div className={classNames.caption} style={styles.caption}>
      <CaptionLabelComponent
        id={props.id}
        displayMonth={props.displayMonth}
        displayIndex={props.displayIndex}
      />
      {renderNavigation()}
    </div>
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: {
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
  [key: string]: any
}) {
  return (
    (<DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 relative",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "rdp-nav_button_previous",
        nav_button_next: "rdp-nav_button_next",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-orange-500 text-black hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption_dropdowns: "flex justify-center items-center gap-1.5 z-10",
        dropdown: "rdp-dropdown",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
        Dropdown: CalendarDropdown,
        Day: CustomDay,
        Caption: CustomCaption,
      }}
      {...props} />)
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
