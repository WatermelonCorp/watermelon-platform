/**
 * Short buying guides for component category pages: a direct answer, when to
 * reach for the component, what to use instead, and real questions people ask.
 *
 * Rendered visibly under the variants grid (component-category.tsx) and in the
 * Worker's crawlable copy, with an FAQPage block, so the two always match.
 * Keep this file free of React and Vite-only imports: the Worker bundles it.
 * Plain text only, no markup.
 */

export interface CategoryGuide {
  /** 40-80 words that fully answer "what is it and how do I add it". */
  answer: string;
  /** Concrete situations where this component is the right pick. */
  useWhen: string[];
  /** Sibling categories to use instead, by slug under /components. */
  instead: { slug: string; when: string }[];
  /** Questions people actually search, answered in the first sentence. */
  faq: { q: string; a: string }[];
}

export const componentGuides: Record<string, CategoryGuide> = {
  accordion: {
    answer:
      'A React accordion is a stack of headings that each expand to reveal a panel of content. Watermelon UI accordions are built on Radix UI primitives with Tailwind CSS, so they are keyboard accessible and support single or multiple open items. Add one with the shadcn CLI, then edit the Tailwind classes to match your design.',
    useWhen: [
      'FAQ sections where each answer should stay hidden until asked for.',
      'Settings or filter panels with groups the user only needs one at a time.',
      'Long documentation or changelog pages that need to scan quickly.',
    ],
    instead: [
      { slug: 'tabs', when: 'the sections are peers the user switches between, not a list to scan' },
      { slug: 'collapsible', when: 'there is a single show-more region rather than a list of items' },
      { slug: 'dialog', when: 'the hidden content needs the user’s full attention' },
    ],
    faq: [
      {
        q: 'How do I make a shadcn accordion open by default?',
        a: 'Pass the item value to defaultValue on the Accordion root, for example defaultValue="item-1". For type="multiple", pass an array of values instead.',
      },
      {
        q: 'Can more than one accordion item be open at once?',
        a: 'Yes. Set type="multiple" on the Accordion root; type="single" keeps only one item open, and collapsible lets the open one close again.',
      },
      {
        q: 'Why is my shadcn accordion animation not working?',
        a: 'Check that your global CSS has @import "tw-animate-css" after @import "tailwindcss", because the animate-accordion-down and animate-accordion-up classes come from it. Its keyframes animate to --radix-accordion-content-height, which Radix measures for each panel.',
      },
      {
        q: 'How do I change the shadcn accordion trigger icon?',
        a: 'Edit AccordionTrigger in your accordion file and swap the icons it renders after its children. It shows a down chevron when closed and an up chevron when open using group-aria-expanded classes, so replace both, or keep one icon and add group-aria-expanded/accordion-trigger:rotate-180.',
      },
    ],
  },
  alerts: {
    answer:
      'A React alert is a static message box that tells the user something important, like a success, a warning, or an error, without interrupting what they are doing. Watermelon UI alerts are built with Tailwind CSS and class-variance-authority, with default and destructive variants and role="alert" on the container. Add one with the shadcn CLI, then swap the icon and classes to match your design.',
    useWhen: [
      'Form-level errors shown above a form after a failed submit.',
      'Billing, quota, or account warnings that should stay on a dashboard until resolved.',
      'Inline notices such as a scheduled maintenance window or a deprecated feature.',
    ],
    instead: [
      { slug: 'sonner', when: 'the message is quick feedback on an action and should disappear on its own' },
      { slug: 'dialog', when: 'the user must confirm or act before they can continue' },
      { slug: 'badge', when: 'you only need a short status label next to an item' },
    ],
    faq: [
      {
        q: 'What is the difference between an alert and a toast?',
        a: 'An alert sits in the page layout and stays until you remove it, while a toast floats over the page and usually closes itself after a few seconds. Use an alert for lasting context and a toast, such as Sonner, for quick feedback.',
      },
      {
        q: 'How do I show an error alert in shadcn?',
        a: 'Pass variant="destructive" to the Alert component. It switches the text and icon to the destructive color token, which you can change in your Tailwind theme.',
      },
      {
        q: 'How do I make an alert dismissible?',
        a: 'Keep a visible state in React and render a close button that sets it to false. The alert itself has no built-in close behavior, so you decide whether a dismissal is remembered.',
      },
      {
        q: 'Are shadcn alerts accessible?',
        a: 'Yes. The container renders with role="alert", so screen readers announce it when it is added to the page. Keep the title short and put the detail in AlertDescription.',
      },
    ],
  },
  avatar: {
    answer:
      'A React avatar is a small image that represents a user or account, with a fallback such as initials when the image is missing. Watermelon UI avatars are built on the Radix UI Avatar primitive with Tailwind CSS, so the fallback only shows while the image loads or if it fails. Add one with the shadcn CLI, then adjust size and shape with Tailwind classes.',
    useWhen: [
      'Comment threads, chat messages, and activity feeds that show who did what.',
      'Account menus in a navbar or sidebar.',
      'Stacked groups of team members or collaborators on a card.',
    ],
    instead: [
      { slug: 'badge', when: 'you need a text label for a status or role, not a picture of a person' },
      { slug: 'tooltip', when: 'the avatar is already there and you only need to show the person’s name on hover' },
    ],
    faq: [
      {
        q: 'How do I show initials when the avatar image fails to load?',
        a: 'Put the initials inside AvatarFallback next to AvatarImage. Radix shows the fallback while the image is loading and keeps it if the image errors.',
      },
      {
        q: 'How do I change the size of a shadcn avatar?',
        a: 'Pass Tailwind size classes to the Avatar root, for example className="size-12". The image and fallback fill the root, so they scale with it.',
      },
      {
        q: 'How do I make a square avatar instead of a circle?',
        a: 'Override the rounding on the Avatar root, for example className="rounded-md". Apply the same class to AvatarImage and AvatarFallback if they keep their own rounding.',
      },
      {
        q: 'How do I stack avatars in a group?',
        a: 'Wrap them in a flex container with a negative space class such as -space-x-2. Add a ring in the background color to each avatar so the overlaps stay readable.',
      },
    ],
  },
  badge: {
    answer:
      'A React badge is a small inline label for a status, count, or category, such as New, Paid, or 3 unread. Watermelon UI badges are built with Tailwind CSS and class-variance-authority, with variants like default, secondary, destructive, and outline, and an asChild option to render them as links. Add one with the shadcn CLI, then change the variant classes to fit your palette.',
    useWhen: [
      'Status labels in a table row, like Active, Pending, or Failed.',
      'Tags or categories on a card or blog post.',
      'Notification counts next to a nav item or icon.',
    ],
    instead: [
      { slug: 'button', when: 'the label needs to trigger an action when clicked' },
      { slug: 'alerts', when: 'the message needs a sentence of explanation, not one or two words' },
      { slug: 'avatar', when: 'you are representing a person or account rather than a status' },
    ],
    faq: [
      {
        q: 'How do I make a shadcn badge a link?',
        a: 'Use asChild and put an anchor or Next.js Link inside the Badge. The badge styles are passed to the child element instead of rendering a span.',
      },
      {
        q: 'How do I add a custom color to a shadcn badge?',
        a: 'Add a new key to the variant object in badgeVariants, or pass Tailwind classes through className for a one-off. A new variant keeps the color reusable and typed.',
      },
      {
        q: 'Can I put an icon inside a badge?',
        a: 'Yes. Place a small icon before or after the text inside the Badge, and the built-in classes size and space it. Keep icons decorative or give them an aria-label.',
      },
      {
        q: 'How do I change the size of a shadcn badge?',
        a: 'Pass Tailwind classes through className, for example className="h-6 px-3 text-sm", because the badge has a fixed h-5 height and no size prop. For sizes you reuse, add a size key to badgeVariants next to variant.',
      },
    ],
  },
  breadcrumb: {
    answer:
      'A React breadcrumb is a row of links that shows where the current page sits in the site hierarchy, like Home / Docs / Components. Watermelon UI breadcrumbs are built with Tailwind CSS on semantic nav and ordered-list markup, with separators, an ellipsis for collapsed levels, and asChild links for your router. Add one with the shadcn CLI, then set the links and separator icon.',
    useWhen: [
      'Docs sites or knowledge bases with nested sections.',
      'E-commerce category and product pages.',
      'Admin dashboards where users drill into records and need a way back up.',
    ],
    instead: [
      { slug: 'tabs', when: 'the views are siblings at the same level, not steps in a hierarchy' },
      { slug: 'pagination', when: 'users are moving through pages of one list rather than levels of a site' },
      { slug: 'dropdown-menu', when: 'you need to list many sibling pages under one trigger' },
    ],
    faq: [
      {
        q: 'How do I use Next.js Link in a shadcn breadcrumb?',
        a: 'Pass asChild to BreadcrumbLink and put a Link inside it. The breadcrumb styles move onto your Link, so client-side navigation keeps working.',
      },
      {
        q: 'How do I change the breadcrumb separator?',
        a: 'Put any icon or character inside BreadcrumbSeparator as its children. With no children it renders a chevron by default.',
      },
      {
        q: 'How do I collapse long breadcrumbs?',
        a: 'Replace the middle items with BreadcrumbEllipsis, optionally inside a dropdown menu that lists the hidden levels. This keeps the first and last levels visible on small screens.',
      },
      {
        q: 'How do I build shadcn breadcrumbs from the current URL?',
        a: 'Split the pathname into segments, for example from usePathname in Next.js, and map each one to a BreadcrumbItem whose link points to the path up to that segment. Render the last segment as BreadcrumbPage and put a BreadcrumbSeparator between items inside a keyed Fragment.',
      },
    ],
  },
  button: {
    answer:
      'A React button triggers an action, such as submitting a form, opening a dialog, or saving a change. Watermelon UI buttons are built with Tailwind CSS and class-variance-authority, with variants like default, outline, secondary, ghost, destructive, and link, several sizes including icon sizes, and an asChild option. Add one with the shadcn CLI, then edit the variants to match your brand.',
    useWhen: [
      'Primary and secondary actions on forms, cards, and dialogs.',
      'Icon-only toolbar actions like edit, copy, or delete.',
      'Call-to-action links on landing pages, using asChild with an anchor.',
    ],
    instead: [
      { slug: 'button-group', when: 'several related actions should read as one connected control' },
      { slug: 'dropdown-menu', when: 'you have more actions than fit and want to tuck them behind one trigger' },
      { slug: 'switch', when: 'the control flips a setting on or off rather than running an action' },
    ],
    faq: [
      {
        q: 'How do I use a shadcn button as a link?',
        a: 'Pass asChild and put an anchor or Next.js Link inside the Button. The button styles are applied to the link, so you keep correct link semantics.',
      },
      {
        q: 'How do I add a loading state to a shadcn button?',
        a: 'Set disabled while the request runs and render a spinner icon before the label. Keeping the label visible stops the button from changing width.',
      },
      {
        q: 'How do I add a new button variant?',
        a: 'Add a key to the variant object in buttonVariants in your button file. It becomes a typed option on the variant prop everywhere you use Button.',
      },
      {
        q: 'How do I make an icon-only button accessible?',
        a: 'Use size="icon" and give the button an aria-label that describes the action. Screen readers have no text to read otherwise.',
      },
    ],
  },
  'button-group': {
    answer:
      'A React button group joins related buttons into one connected control, like a split button, a segmented toolbar, or an action with a count. Watermelon UI button groups are composed from the shadcn Button with Tailwind CSS, merging borders and rounding only the outer corners. Add one with the shadcn CLI, then change the buttons, icons, and labels inside it.',
    useWhen: [
      'Editor toolbars with bold, italic, and underline next to each other.',
      'Split buttons with a main action and a menu of related ones.',
      'Pagers or zoom controls with previous, next, plus, and minus.',
    ],
    instead: [
      { slug: 'tabs', when: 'the segments switch between views rather than run actions' },
      { slug: 'radio-group', when: 'the user picks exactly one value in a form' },
      { slug: 'dropdown-menu', when: 'there are too many actions to show side by side' },
    ],
    faq: [
      {
        q: 'How do I group buttons together in shadcn?',
        a: 'Wrap the buttons in an inline-flex container and remove the inner rounding so only the outer corners stay round. Overlap borders with -space-x-px so they do not double up.',
      },
      {
        q: 'How do I make a split button with a dropdown?',
        a: 'Put a main Button next to an icon Button that is the trigger of a DropdownMenu. Join them with the same group container so they read as one control.',
      },
      {
        q: 'How do I show which button in a group is active?',
        a: 'Keep the selected value in state and switch that button’s variant or add an active class. Add aria-pressed to toggle buttons so assistive tech knows the state.',
      },
      {
        q: 'How do I make a shadcn button group full width?',
        a: 'Pass className="w-full" to ButtonGroup, which is w-fit by default, and add flex-1 to each Button. The group is a flex row, so the buttons then share the width evenly.',
      },
    ],
  },
  calendar: {
    answer:
      'A React calendar is a month grid for picking or showing dates, with support for single dates, multiple dates, and ranges. Watermelon UI calendars are built on react-day-picker with Tailwind CSS, so selection modes, disabled days, and month and year dropdowns come from its props. Add one with the shadcn CLI, then pass mode, selected, and onSelect to wire it to your state.',
    useWhen: [
      'Booking pages where users pick an available day.',
      'Dashboards that filter data by a date range.',
      'Scheduling screens that show more than one month side by side.',
    ],
    instead: [
      { slug: 'date-picker', when: 'the calendar should open from a field instead of always taking up space' },
      { slug: 'input-mask', when: 'users already know the date and typing it is faster than clicking' },
    ],
    faq: [
      {
        q: 'How do I select a date range in the shadcn calendar?',
        a: 'Set mode="range" and keep a { from, to } object in state passed to selected and onSelect. Add numberOfMonths={2} to show two months for longer ranges.',
      },
      {
        q: 'How do I disable past dates?',
        a: 'Pass a matcher to the disabled prop, for example disabled={{ before: new Date() }}. You can also pass an array of dates or a function that returns true for blocked days.',
      },
      {
        q: 'How do I add month and year dropdowns?',
        a: 'Set captionLayout="dropdown" on the calendar. Use startMonth and endMonth to limit the years shown in the dropdown.',
      },
      {
        q: 'How do I disable weekends?',
        a: 'Pass disabled={{ dayOfWeek: [0, 6] }}, where 0 is Sunday and 6 is Saturday. Combine it with other matchers in an array if you also need to block holidays.',
      },
    ],
  },
  card: {
    answer:
      'A React card is a bordered container that groups related content, like a product, a stat, a profile, or a form. Watermelon UI cards are plain React components styled with Tailwind CSS, with CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter slots. Add one with the shadcn CLI, then fill the slots with your content.',
    useWhen: [
      'Pricing plans and product tiles laid out in a grid.',
      'Dashboard stat blocks and small charts.',
      'Login, sign-up, or settings forms that need a clear boundary.',
    ],
    instead: [
      { slug: 'table', when: 'many items share the same fields and need to be compared row by row' },
      { slug: 'dialog', when: 'the content should appear on top of the page only when asked for' },
      { slug: 'collapsible', when: 'the grouped content should start hidden' },
    ],
    faq: [
      {
        q: 'How do I make a whole shadcn card clickable?',
        a: 'Wrap the Card in a link, or put a link in the title and stretch it with an absolutely positioned pseudo-element. The second option keeps other buttons inside the card clickable.',
      },
      {
        q: 'How do I put a button in the card header?',
        a: 'Place it inside CardAction within CardHeader. The header grid moves it to the top-right corner next to the title.',
      },
      {
        q: 'How do I make cards the same height in a grid?',
        a: 'Use a CSS grid for the row and give each card h-full. Put the footer last with mt-auto so buttons line up across cards.',
      },
      {
        q: 'How do I remove the border or add a shadow to a shadcn card?',
        a: 'Pass className="ring-0", because the card draws its outline with ring-1 ring-foreground/10 rather than a border. It ships without a shadow, so add a class like shadow-md if you want one.',
      },
    ],
  },
  checkbox: {
    answer:
      'A React checkbox lets users turn an option on or off, or pick several options from a list. Most Watermelon UI checkboxes are built on the Radix UI Checkbox primitive with Tailwind CSS, and a few use Base UI, so they are keyboard accessible and support an indeterminate state. Add one with the shadcn CLI, then pair it with a Label and wire checked and onCheckedChange.',
    useWhen: [
      'Accepting terms or opting in to emails on a form.',
      'Selecting rows in a table, with a select-all checkbox in the header.',
      'Filter lists where several options can be active at once.',
    ],
    instead: [
      { slug: 'switch', when: 'the setting takes effect immediately, like a preference toggle' },
      { slug: 'radio-group', when: 'only one option in the set can be chosen' },
      { slug: 'select', when: 'the list is long and should stay collapsed until opened' },
    ],
    faq: [
      {
        q: 'How do I make a shadcn checkbox checked by default?',
        a: 'Pass defaultChecked for an uncontrolled checkbox, or checked with onCheckedChange to control it from state. Use one approach, not both.',
      },
      {
        q: 'How do I show an indeterminate checkbox?',
        a: 'With the Radix-based checkbox, set checked="indeterminate". It is the usual state for a select-all box when only some rows are selected.',
      },
      {
        q: 'How do I use a shadcn checkbox with react-hook-form?',
        a: 'Render it inside a Controller and map field.value to checked and field.onChange to onCheckedChange. A plain register call does not work because the Radix checkbox is a button, not a native input.',
      },
      {
        q: 'Why does onChange not work on a shadcn checkbox?',
        a: 'The Radix checkbox is a button, so use onCheckedChange instead of onChange. It receives true, false, or "indeterminate", so store checked === true if your state is a plain boolean.',
      },
    ],
  },
  collapsible: {
    answer:
      'A React collapsible is a single region that shows or hides content when a trigger is clicked, like a show more section. Watermelon UI collapsibles are built on the Radix UI Collapsible primitive with Tailwind CSS, so the trigger gets aria-expanded and the open state can be controlled or left uncontrolled. Add one with the shadcn CLI, then put your trigger and content inside it.',
    useWhen: [
      'Show more sections on long descriptions or reviews.',
      'Advanced options hidden under a simple form.',
      'Expandable groups in a sidebar navigation.',
    ],
    instead: [
      { slug: 'tabs', when: 'the user switches between several panels instead of opening one' },
      { slug: 'popover', when: 'the content should float over the page rather than push it down' },
      { slug: 'sheet', when: 'the hidden content is large enough to need its own panel' },
    ],
    faq: [
      {
        q: 'What is the difference between collapsible and accordion?',
        a: 'A collapsible controls one region, while an accordion manages a list of sections and can limit how many are open. Use an accordion when you have several related items.',
      },
      {
        q: 'How do I make a shadcn collapsible open by default?',
        a: 'Pass defaultOpen to the Collapsible root. To control it, pass open and onOpenChange instead.',
      },
      {
        q: 'How do I animate the collapsible?',
        a: 'Animate CollapsibleContent based on its data-state attribute, using the --radix-collapsible-content-height CSS variable for the height. That variable holds the measured content height.',
      },
      {
        q: 'How do I rotate the chevron when it opens?',
        a: 'Style the icon with a data-state selector on the trigger, for example a group class and group-data-[state=open]:rotate-180. The trigger gets data-state="open" or "closed".',
      },
    ],
  },
  combobox: {
    answer:
      'A React combobox is an input that lets users type to filter a list and pick an option, like a searchable select. Watermelon UI comboboxes combine a Radix UI Popover with a cmdk Command list, styled with Tailwind CSS, and include single and multi-select patterns. Add one with the shadcn CLI, then pass your options and keep the selected value in state.',
    useWhen: [
      'Picking a country, timezone, or currency from a long list.',
      'Assigning users or tags where typing is faster than scrolling.',
      'Multi-select fields that show chosen items as badges.',
    ],
    instead: [
      { slug: 'select', when: 'the list is short enough that searching is not needed' },
      { slug: 'radio-group', when: 'there are only a few options and all should stay visible' },
      { slug: 'dropdown-menu', when: 'the items are actions to run, not values to choose' },
    ],
    faq: [
      {
        q: 'How do I make a shadcn combobox with multiple selection?',
        a: 'Keep an array of values in state and toggle a value in each CommandItem onSelect instead of closing the popover. Show the selected values as badges in the trigger.',
      },
      {
        q: 'How do I filter options by label instead of value?',
        a: 'cmdk filters on each CommandItem value, so set value to the text people will type, such as the label. Keep your ID in a separate field for the saved selection.',
      },
      {
        q: 'Why does my shadcn combobox not scroll inside a dialog?',
        a: 'Set modal on the Popover root, as in <Popover modal>. The dialog blocks scrolling outside its own content, and the popover list is portaled outside it, so the wheel does nothing until the popover is modal too.',
      },
      {
        q: 'How do I make the popover the same width as the trigger?',
        a: 'Give PopoverContent the class w-(--radix-popover-trigger-width). Radix sets that CSS variable to the trigger width.',
      },
    ],
  },
  'data-table': {
    answer:
      'A React data table is a table with built-in behavior, such as sorting, filtering, row selection, and pagination, for working with many records. Watermelon UI data tables are built on the shadcn Table with Tailwind CSS, using React state together with checkboxes, inputs, selects, and dropdown menus. Add one with the shadcn CLI, then replace the sample rows and columns with your data.',
    useWhen: [
      'Admin screens for users, orders, or invoices.',
      'Lists where people need to search, sort, and act on rows in bulk.',
      'Reports that split long results across pages.',
    ],
    instead: [
      { slug: 'table', when: 'the data is short and read-only, with no sorting or selection' },
      { slug: 'card', when: 'each item has a picture or very different fields and reads better as a tile' },
    ],
    faq: [
      {
        q: 'Do I need TanStack Table for a shadcn data table?',
        a: 'No. Watermelon UI’s data tables handle sorting, filtering, and selection with plain React state, so there is no extra table library to install. For very large or complex grids, you can move to TanStack Table later.',
      },
      {
        q: 'How do I add row selection with checkboxes?',
        a: 'Keep a set of selected row IDs in state and render a Checkbox in each row and in the header. Show the header checkbox as indeterminate when only some rows are selected.',
      },
      {
        q: 'How do I sort a column when the header is clicked?',
        a: 'Store the sort key and direction in state, sort a copy of the rows before rendering, and toggle direction on each header click. Add aria-sort to the active header.',
      },
      {
        q: 'Should I paginate on the client or the server?',
        a: 'Paginate on the client when all rows are already loaded and the list is small. For large datasets, fetch one page at a time from the server and pass the page and total count to the table.',
      },
    ],
  },
  'date-picker': {
    answer:
      'A React date picker is a field that opens a calendar so users can choose a date or a date range. Most Watermelon UI date pickers put a react-day-picker calendar inside a Radix UI Popover, styled with Tailwind CSS, with single-date and date range variants. Add one with the shadcn CLI, then store the selected date in state or your form library.',
    useWhen: [
      'Forms that ask for a single date, like a due date or a birthday.',
      'Report filters that need a start and end date.',
      'Booking flows where only some days are available.',
    ],
    instead: [
      { slug: 'calendar', when: 'the calendar should always be visible on the page' },
      { slug: 'input-mask', when: 'users know the exact date and should type it in a fixed format' },
      { slug: 'select', when: 'users choose from a few named periods like Last 7 days' },
    ],
    faq: [
      {
        q: 'How do I make a shadcn date range picker?',
        a: 'Set mode="range" on the Calendar inside the popover and store a { from, to } object in state. Format both dates in the trigger button so users can see the range.',
      },
      {
        q: 'How do I close the date picker after selecting a date?',
        a: 'Control the Popover with open and onOpenChange, then set open to false in the calendar’s onSelect. For ranges, close only once both dates are set.',
      },
      {
        q: 'How do I format the selected date?',
        a: 'Format the Date object yourself in the trigger, for example with date-fns format or toLocaleDateString. The calendar stores a Date, not a string.',
      },
      {
        q: 'How do I use the date picker with react-hook-form?',
        a: 'Render it inside a Controller and pass field.value to selected and field.onChange to onSelect. Validate the field with a zod date schema.',
      },
    ],
  },
  dialog: {
    answer:
      'A React dialog, often called a modal, is a window that opens over the page and holds focus until it is closed. Watermelon UI dialogs are built on the Radix UI Dialog primitive with Tailwind CSS, so focus trapping, Escape to close, and screen reader labels work out of the box. Add one with the shadcn CLI, then put your form or message inside DialogContent.',
    useWhen: [
      'Short forms like inviting a teammate or renaming a file.',
      'Confirming a destructive action such as deleting a project.',
      'Previews or details that need the user’s full attention.',
    ],
    instead: [
      { slug: 'sheet', when: 'the content is long or works best as a side panel' },
      { slug: 'popover', when: 'the content is small and should stay next to its trigger without blocking the page' },
      { slug: 'alerts', when: 'the message is informational and does not need a response' },
    ],
    faq: [
      {
        q: 'How do I stop a shadcn dialog from closing on outside click?',
        a: 'Call event.preventDefault() in onInteractOutside on DialogContent. Use onEscapeKeyDown the same way if Escape should not close it either.',
      },
      {
        q: 'How do I change the width of a shadcn dialog?',
        a: 'Pass a max width at the sm breakpoint to DialogContent, for example className="sm:max-w-2xl". The content ships with sm:max-w-sm, so a plain max-w-2xl class still loses to it on larger screens.',
      },
      {
        q: 'How do I close the dialog after a form submits?',
        a: 'Control the dialog and set open to false when the submit succeeds. Wrapping the submit button in DialogClose closes it before your request finishes, so avoid that for async forms.',
      },
      {
        q: 'How do I hide the close button in the corner?',
        a: 'Pass showCloseButton={false} to DialogContent. Make sure the dialog still has another way to close, like a Cancel button.',
      },
    ],
  },
  'dropdown-menu': {
    answer:
      'A React dropdown menu is a list of actions or options that opens from a button, like an account menu or a row’s more actions menu. Watermelon UI dropdown menus are built on the Radix UI DropdownMenu primitive with Tailwind CSS, with support for groups, separators, checkbox items, radio items, and submenus. Add one with the shadcn CLI, then fill DropdownMenuContent with your items.',
    useWhen: [
      'User account menus in a navbar.',
      'More actions menus on table rows and cards.',
      'View options like sort order or visible columns.',
    ],
    instead: [
      { slug: 'select', when: 'the user is choosing a form value, not running an action' },
      { slug: 'combobox', when: 'the list is long and needs a search box' },
      { slug: 'popover', when: 'the floating content is a form or rich content rather than a list of items' },
    ],
    faq: [
      {
        q: 'How do I open a dialog from a dropdown menu item?',
        a: 'Keep the dialog’s open state outside the menu and set it in the item’s onSelect. Rendering the Dialog outside DropdownMenuContent stops it from unmounting when the menu closes.',
      },
      {
        q: 'Why does the page freeze after closing a dropdown and a dialog?',
        a: 'Both are modal by default, and closing one while the other is mid-transition can leave pointer events blocked on the body. Opening the dialog from controlled state, or setting modal={false} on the DropdownMenu, usually fixes it.',
      },
      {
        q: 'How do I keep the menu open after clicking an item?',
        a: 'Call event.preventDefault() in the item’s onSelect. This is common for checkbox items that toggle several options in a row.',
      },
      {
        q: 'How do I align the dropdown to the right edge of the trigger?',
        a: 'Pass align="end" to DropdownMenuContent. Use side and sideOffset to change which side it opens on and how far away.',
      },
    ],
  },
  form: {
    answer:
      'A React form collects user input, validates it, and submits it. Watermelon UI forms are built with react-hook-form and zod through @hookform/resolvers, using shadcn Field components for labels, descriptions, and error messages, styled with Tailwind CSS. Add one with the shadcn CLI, then edit the zod schema and fields to match your data.',
    useWhen: [
      'Sign-up, login, and contact forms with field-level errors.',
      'Settings pages that save several values at once.',
      'Multi-field flows that need typed values and schema validation.',
    ],
    instead: [
      { slug: 'dialog', when: 'the form is short and should open over the current page' },
      { slug: 'input-otp', when: 'the form only asks for a one-time code' },
    ],
    faq: [
      {
        q: 'How do I validate a shadcn form with zod?',
        a: 'Define a zod schema and pass zodResolver(schema) as the resolver option to useForm. Field errors then come from the schema and show next to each field.',
      },
      {
        q: 'How do I connect a shadcn Select or Checkbox to react-hook-form?',
        a: 'Wrap it in a Controller and map field.value and field.onChange to the component’s value and change props. These components are not native inputs, so register alone does not work.',
      },
      {
        q: 'How do I reset a form after submit?',
        a: 'Call form.reset() from useForm after the submit succeeds. Pass new values to reset if the form should show the saved data.',
      },
      {
        q: 'How do I show a server error on a field?',
        a: 'Call form.setError with the field name and a message after the request fails. Use a root key, like "root.serverError", for errors that belong to the whole form.',
      },
    ],
  },
  'input-mask': {
    answer:
      'A React input mask formats what users type into a fixed pattern, like a card number, an expiry date, or a license plate. Watermelon UI masked inputs use react-payment-inputs for card fields and use-mask-input for pattern masks, on top of the shadcn Input with Tailwind CSS. Add one with the shadcn CLI, then change the mask pattern or payment fields you need.',
    useWhen: [
      'Checkout forms with card number, expiry, and CVC fields.',
      'Codes with a fixed shape, like license plates or postal codes.',
      'Dates or times that must be typed in one format.',
    ],
    instead: [
      { slug: 'input-otp', when: 'the value is a short verification code split into boxes' },
      { slug: 'date-picker', when: 'users should pick a date from a calendar rather than type it' },
      { slug: 'textarea', when: 'the input is free text with no fixed pattern' },
    ],
    faq: [
      {
        q: 'How do I format a credit card input in React?',
        a: 'Spread getCardNumberProps, getExpiryDateProps, and getCVCProps from the usePaymentInputs hook onto your inputs. react-payment-inputs formats and validates the values as the user types.',
      },
      {
        q: 'How do I add a phone or postal code mask?',
        a: 'Attach withMask from use-mask-input to the input ref with a pattern, where 9 means a digit and A means a letter. It also accepts named aliases like datetime.',
      },
      {
        q: 'Does a mask change the value I submit?',
        a: 'Usually the field value includes the mask characters, like spaces or slashes. Strip them before saving if your backend expects digits only.',
      },
      {
        q: 'How do I add a date mask to an input?',
        a: 'Pass the datetime alias to withMask with an inputFormat, for example withMask("datetime", { inputFormat: "dd/mm/yyyy" }). The same alias handles times with a format like HH:MM:ss, where MM means minutes.',
      },
    ],
  },
  'input-otp': {
    answer:
      'A React OTP input is a row of boxes for entering a one-time code, like a 6-digit login or verification code. Watermelon UI OTP inputs are built on the input-otp library with Tailwind CSS, so paste, autofill, and keyboard navigation work across the slots. Add one with the shadcn CLI, then set maxLength and handle the finished code in onComplete or onChange.',
    useWhen: [
      'Email or SMS verification during sign-up.',
      'Two-factor authentication codes at login.',
      'Short PINs or invite codes with a fixed length.',
    ],
    instead: [
      { slug: 'input-mask', when: 'the value is longer or has a mixed pattern like a card number' },
      { slug: 'form', when: 'the code is one field among several that need schema validation' },
    ],
    faq: [
      {
        q: 'How do I allow only numbers in the OTP input?',
        a: 'Pass pattern={REGEXP_ONLY_DIGITS}, imported from input-otp. Use REGEXP_ONLY_DIGITS_AND_CHARS to allow letters too.',
      },
      {
        q: 'How do I submit the code automatically when it is complete?',
        a: 'Use the onComplete callback, which fires once every slot is filled. Call your verify function from there instead of waiting for a button.',
      },
      {
        q: 'How do I use the shadcn OTP input with react-hook-form?',
        a: 'Render InputOTP inside a Controller and pass field.value to value and field.onChange to onChange. input-otp calls onChange with the whole code as a string, so a zod rule like z.string().length(6) validates it.',
      },
      {
        q: 'Does the OTP input support paste and SMS autofill?',
        a: 'Yes. input-otp renders one transparent input over the slots, so pasting a full code fills every slot. It sets autocomplete to one-time-code by default, which lets phones suggest codes from SMS.',
      },
    ],
  },
  pagination: {
    answer:
      'A React pagination control lets users move through a long list one page at a time, with previous, next, and numbered links. Watermelon UI pagination is built with Tailwind CSS on semantic nav and list markup, with an isActive link that sets aria-current="page" and an ellipsis for skipped pages. Add one with the shadcn CLI, then compute the page numbers from your data.',
    useWhen: [
      'Blog archives and search results with many pages.',
      'Tables with more rows than fit on one screen.',
      'Product listings where page links should be shareable URLs.',
    ],
    instead: [
      { slug: 'data-table', when: 'pagination is one part of a table with sorting and selection' },
      { slug: 'tabs', when: 'there are only a few fixed views, not numbered pages' },
      { slug: 'breadcrumb', when: 'users are moving up and down a hierarchy, not through a list' },
    ],
    faq: [
      {
        q: 'How do I disable the previous button on the first page?',
        a: 'PaginationPrevious renders a link, so it has no disabled prop; add aria-disabled and className="pointer-events-none opacity-50" on the first page, or leave it out. Do the same for PaginationNext on the last page.',
      },
      {
        q: 'How do I mark the current page?',
        a: 'Pass isActive to the matching PaginationLink. It sets aria-current="page" and switches the link to the active style.',
      },
      {
        q: 'How do I use Next.js Link with shadcn pagination?',
        a: 'PaginationLink renders an anchor inside the Button, so pass href with a page query such as ?page=2. For client-side routing, build your own link component with the same classes around Next.js Link.',
      },
      {
        q: 'How do I show an ellipsis for skipped pages?',
        a: 'Render PaginationEllipsis between page numbers that are not next to each other. A common pattern shows the first page, the last page, and one or two pages on each side of the current one.',
      },
    ],
  },
  popover: {
    answer:
      'A React popover is a small floating panel that opens next to its trigger and can hold interactive content, like a form or a set of controls. Watermelon UI popovers are built on the Radix UI Popover primitive with Tailwind CSS, so positioning, collision handling, focus management, and Escape to close are handled for you. Add one with the shadcn CLI, then put your content in PopoverContent.',
    useWhen: [
      'Quick edit forms, like renaming an item in place.',
      'Filter or settings panels opened from a toolbar button.',
      'Pickers such as color, emoji, or date choosers.',
    ],
    instead: [
      { slug: 'tooltip', when: 'you only need a short read-only hint on hover or focus' },
      { slug: 'dropdown-menu', when: 'the panel is a list of actions to choose from' },
      { slug: 'dialog', when: 'the content needs the user’s full attention or a lot of space' },
    ],
    faq: [
      {
        q: 'How do I open a shadcn popover on hover?',
        a: 'Use HoverCard instead, because the Radix popover opens on click or from controlled state, not on hover. HoverCard takes openDelay and closeDelay, and is meant for previews, so keep forms and key actions in a click-opened popover.',
      },
      {
        q: 'How do I close a popover programmatically?',
        a: 'Control it with open and onOpenChange on the Popover root, then set open to false from your code. This is common after a form inside it saves.',
      },
      {
        q: 'How do I change where the popover opens?',
        a: 'Pass side and align to PopoverContent, for example side="top" align="start". Use sideOffset to change the gap between the trigger and the panel.',
      },
      {
        q: 'How do I make the popover match the trigger width?',
        a: 'Give PopoverContent the class w-(--radix-popover-trigger-width). Radix sets that CSS variable to the trigger width.',
      },
    ],
  },
  'radio-group': {
    answer:
      'A React radio group is a set of options where only one can be selected, like a shipping speed or a plan. Watermelon UI radio groups are built on the Radix UI RadioGroup primitive with Tailwind CSS, so arrow keys move between options and the group exposes the right roles. Add one with the shadcn CLI, then pair each RadioGroupItem with a Label and wire value and onValueChange.',
    useWhen: [
      'Choosing a plan, shipping method, or payment option.',
      'Survey questions with a few fixed answers.',
      'Settings with two to five choices that should all stay visible.',
    ],
    instead: [
      { slug: 'select', when: 'there are many options and they should stay collapsed' },
      { slug: 'checkbox', when: 'the user can pick more than one option' },
      { slug: 'switch', when: 'there are only two states, on and off' },
    ],
    faq: [
      {
        q: 'How do I set a default value on a shadcn radio group?',
        a: 'Pass defaultValue with the value of the item to preselect. To control it, use value and onValueChange instead.',
      },
      {
        q: 'How do I make a horizontal radio group?',
        a: 'Change the layout with Tailwind, for example a flex row, and set orientation="horizontal" so arrow key behavior matches. The default layout is a vertical grid.',
      },
      {
        q: 'How do I make radio buttons look like cards?',
        a: 'Wrap each RadioGroupItem and its text in a Label styled as a card, and style the checked card with a has-[[data-state=checked]] selector. Clicking anywhere on the card then selects it.',
      },
      {
        q: 'How do I use a radio group with react-hook-form?',
        a: 'Render it in a Controller and pass field.value to value and field.onChange to onValueChange. Validate the allowed values with a zod enum.',
      },
    ],
  },
  select: {
    answer:
      'A React select lets users choose one value from a list that opens from a trigger. Most Watermelon UI selects are built on the Radix UI Select primitive with Tailwind CSS, and others use a styled native select element, so you can pick custom styling or native mobile pickers. Add one with the shadcn CLI, then fill SelectContent with SelectItem options.',
    useWhen: [
      'Choosing a country, role, or category in a form.',
      'Sort or filter controls above a list.',
      'Settings with more options than fit as radio buttons.',
    ],
    instead: [
      { slug: 'combobox', when: 'the list is long enough that users need to search it' },
      { slug: 'radio-group', when: 'there are only a few options and all should stay visible' },
      { slug: 'dropdown-menu', when: 'the items are actions to run, not values to save' },
    ],
    faq: [
      {
        q: 'How do I add a placeholder to a shadcn select?',
        a: 'Pass placeholder to SelectValue, for example <SelectValue placeholder="Select a role" />. It shows whenever no value is selected.',
      },
      {
        q: 'How do I reset a shadcn select to the placeholder?',
        a: 'Control the select and set its value back to an empty string. SelectItem itself cannot use an empty string as its value, because Radix reserves it for clearing.',
      },
      {
        q: 'How do I group options in a select?',
        a: 'Wrap related items in SelectGroup with a SelectLabel heading, and use SelectSeparator between groups. Screen readers announce the group label.',
      },
      {
        q: 'How do I add search to a shadcn select?',
        a: 'Use a combobox built from Popover and Command instead, because the Radix select has no search field and only jumps to items as you type their first letters. cmdk filters the list as the user types.',
      },
    ],
  },
  sheet: {
    answer:
      'A React sheet is a panel that slides in from an edge of the screen, often called a drawer or side panel. Watermelon UI sheets are built on the Radix UI Dialog primitive with Tailwind CSS, so they trap focus and close on Escape like a modal, and open from the top, right, bottom, or left. Add one with the shadcn CLI, then put your content in SheetContent.',
    useWhen: [
      'Mobile navigation menus.',
      'Edit forms that should keep the list visible behind them.',
      'Filter panels, carts, and detail views beside a table.',
    ],
    instead: [
      { slug: 'dialog', when: 'the content is short and should sit in the center of the screen' },
      { slug: 'popover', when: 'the panel is small and should stay next to its trigger' },
      { slug: 'collapsible', when: 'the content should expand inline without covering the page' },
    ],
    faq: [
      {
        q: 'How do I open a shadcn sheet from the left?',
        a: 'Pass side="left" to SheetContent. The other options are top, right, and bottom, and right is the default.',
      },
      {
        q: 'How do I change the width of a sheet?',
        a: 'Pass width classes to SheetContent, for example className="w-full sm:max-w-lg". Override the default max width at the same breakpoint, or it will still apply.',
      },
      {
        q: 'What is the difference between a sheet and a drawer?',
        a: 'In shadcn, a sheet is a Radix Dialog that slides from a screen edge, while the drawer component is built on Vaul and supports drag to close on mobile. Both are modal side panels.',
      },
      {
        q: 'How do I close a sheet after a link is clicked?',
        a: 'Control the Sheet with open and onOpenChange and set open to false in the link’s onClick, or wrap the link in SheetClose with asChild.',
      },
    ],
  },
  sonner: {
    answer:
      'Sonner is a toast library for React that shows short notifications which stack and close on their own. Watermelon UI toasts use sonner with a themed Toaster styled with Tailwind CSS, covering success, error, action, and promise toasts. Add it with the shadcn CLI, render one Toaster in your root layout, then call toast() from anywhere in your app.',
    useWhen: [
      'Confirming that a save, copy, or upload worked.',
      'Showing loading, success, and error states for an async request.',
      'Offering an undo action after a delete.',
    ],
    instead: [
      { slug: 'alerts', when: 'the message should stay on the page until the issue is fixed' },
      { slug: 'dialog', when: 'the user must respond before continuing' },
    ],
    faq: [
      {
        q: 'Why is my sonner toast not showing?',
        a: 'Usually the Toaster is not rendered. Add <Toaster /> once in your root layout inside body, and call toast() from a client component.',
      },
      {
        q: 'How do I show a loading toast that updates when a promise finishes?',
        a: 'Use toast.promise(promise, { loading, success, error }). The same toast moves from the loading message to success or error when the promise settles.',
      },
      {
        q: 'How do I change the colors of a sonner toast?',
        a: 'Pass richColors to Toaster for colored success, error, warning, and info toasts, or style them with toastOptions.classNames. The default toast reads your popover, popover-foreground, and border theme tokens, so changing those restyles it too.',
      },
      {
        q: 'How do I add an undo button to a toast?',
        a: 'Pass an action object with a label and onClick, for example toast("Deleted", { action: { label: "Undo", onClick: restore } }). The button appears inside the toast.',
      },
    ],
  },
  switch: {
    answer:
      'A React switch is an on and off toggle for a setting that takes effect right away, like dark mode or notifications. Watermelon UI switches are built on the Radix UI Switch primitive with Tailwind CSS, so they use role="switch", toggle with Space, and can be controlled or uncontrolled. Add one with the shadcn CLI, then pair it with a Label and wire checked and onCheckedChange.',
    useWhen: [
      'Notification and privacy settings that save immediately.',
      'Feature toggles in an admin panel.',
      'Theme or billing period toggles, like monthly versus yearly.',
    ],
    instead: [
      { slug: 'checkbox', when: 'the choice is only applied when a form is submitted' },
      { slug: 'radio-group', when: 'there are more than two options' },
      { slug: 'button', when: 'the control runs a one-off action instead of holding a state' },
    ],
    faq: [
      {
        q: 'How do I use a shadcn switch as a dark mode toggle?',
        a: 'Read resolvedTheme and setTheme from useTheme in next-themes, pass checked={resolvedTheme === "dark"}, and call setTheme(checked ? "dark" : "light") in onCheckedChange. Render it after mount, since the theme is unknown on the server.',
      },
      {
        q: 'How do I control a shadcn switch?',
        a: 'Pass checked from state and update it in onCheckedChange. Use defaultChecked instead if you do not need to read the value in React.',
      },
      {
        q: 'How do I add a label to a switch?',
        a: 'Give the Switch an id and point a Label at it with htmlFor. Clicking the label then toggles the switch and screen readers read the label.',
      },
      {
        q: 'How do I change the switch size or color?',
        a: 'Pass size="sm" for the smaller built-in size, or className with checked-state classes such as data-checked:bg-emerald-500 for a custom color. Going larger than default means editing the track and thumb sizes in your switch file so they still line up.',
      },
    ],
  },
  table: {
    answer:
      'A React table shows rows and columns of data using semantic HTML table elements. Watermelon UI tables are plain React components styled with Tailwind CSS, with Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, and TableCaption parts, and a scroll wrapper for narrow screens. Add one with the shadcn CLI, then map your data to rows.',
    useWhen: [
      'Invoices, price lists, and comparison grids.',
      'Small read-only lists of records on a dashboard.',
      'Spec sheets where each row has the same fields.',
    ],
    instead: [
      { slug: 'data-table', when: 'users need to sort, filter, select, or page through rows' },
      { slug: 'card', when: 'each item has a picture or mixed content that does not fit columns' },
    ],
    faq: [
      {
        q: 'What is the difference between a shadcn table and a data table?',
        a: 'The table is only styled markup, while a data table adds behavior like sorting, filtering, selection, and pagination on top of it. Start with a table and move to a data table when users need to work with rows.',
      },
      {
        q: 'How do I make a shadcn table responsive?',
        a: 'The Table component already wraps the table in a container with horizontal scroll. For small screens you can also hide low-priority columns with responsive classes like hidden md:table-cell.',
      },
      {
        q: 'How do I add a sticky header?',
        a: 'Table renders its own overflow-x-auto wrapper, so that div is the scroll container: give it a max height in your local table file, then add sticky top-0 with a background color to TableHeader. The background stops rows from showing through.',
      },
      {
        q: 'How do I make a shadcn table scrollable?',
        a: 'Horizontal scroll is built in, because Table wraps the table in a div with overflow-x-auto. For vertical scroll, wrap Table in a div with a fixed height, such as h-96 overflow-y-auto.',
      },
    ],
  },
  tabs: {
    answer:
      'React tabs switch between related panels of content in the same space, showing one at a time. Watermelon UI tabs are built on the Radix UI Tabs primitive with Tailwind CSS, so arrow keys move between tabs and each panel is linked to its tab for screen readers. Add them with the shadcn CLI, then set defaultValue and give each TabsTrigger and TabsContent a matching value.',
    useWhen: [
      'Account or settings pages split into sections.',
      'Product pages with description, specs, and reviews.',
      'Code examples that switch between languages or package managers.',
    ],
    instead: [
      { slug: 'collapsible', when: 'the content is one optional section to show or hide' },
      { slug: 'pagination', when: 'the panels are numbered pages of the same list' },
      { slug: 'select', when: 'there are too many options to fit as tabs' },
    ],
    faq: [
      {
        q: 'How do I set the default tab in shadcn tabs?',
        a: 'Pass defaultValue to the Tabs root with the value of the tab to show first. To control it, use value and onValueChange.',
      },
      {
        q: 'How do I sync tabs with the URL?',
        a: 'Control the tabs with value from a query parameter and update the URL in onValueChange. Users can then share or refresh a link to a specific tab.',
      },
      {
        q: 'How do I make vertical tabs?',
        a: 'Set orientation="vertical" on the Tabs root and lay out the list and panels side by side with Tailwind. Up and down arrow keys then move between tabs.',
      },
      {
        q: 'Are inactive tab panels still mounted?',
        a: 'No. Radix unmounts inactive TabsContent by default, which resets their state. Pass forceMount and hide inactive panels with CSS if you need to keep their state.',
      },
    ],
  },
  textarea: {
    answer:
      'A React textarea is a multi-line text field for longer input, like comments, messages, or descriptions. Watermelon UI textareas are styled native textarea elements built with Tailwind CSS, using field-sizing-content so they grow with their content in browsers that support it. Add one with the shadcn CLI, then pair it with a Label and set rows, maxLength, or placeholder as needed.',
    useWhen: [
      'Comment boxes and chat message composers.',
      'Feedback and support forms.',
      'Bio or description fields in a profile.',
    ],
    instead: [
      { slug: 'input-mask', when: 'the value has a fixed format like a phone or card number' },
      { slug: 'form', when: 'the textarea is one of several fields that need validation' },
    ],
    faq: [
      {
        q: 'How do I make a shadcn textarea auto-resize?',
        a: 'The textarea uses the CSS field-sizing: content property, so it grows with its text in browsers that support it. For older browsers, set the height from scrollHeight in an onChange handler.',
      },
      {
        q: 'Why does rows not work on a shadcn textarea?',
        a: 'The textarea uses field-sizing-content, which sizes it to its text and ignores rows in browsers that support it. Add field-sizing-fixed to its className to make rows work again, or set a height class like min-h-32.',
      },
      {
        q: 'How do I stop the user from resizing the textarea?',
        a: 'Add the Tailwind class resize-none. Use resize-y to allow only vertical resizing.',
      },
      {
        q: 'How do I use a textarea with react-hook-form?',
        a: 'Spread register("fieldName") onto it, since it is a native textarea. Show the error message from formState.errors below it.',
      },
    ],
  },
  tooltip: {
    answer:
      'A React tooltip is a short text label that appears when a user hovers over or focuses an element, like the name of an icon button. Watermelon UI tooltips are built on Radix UI Tooltip, with some variants using Radix Hover Card for richer previews, styled with Tailwind CSS. Add one with the shadcn CLI, wrap your app in TooltipProvider, then put the trigger and content inside Tooltip.',
    useWhen: [
      'Labels for icon-only buttons in a toolbar.',
      'Short explanations of a field or metric.',
      'Full text for truncated names or values.',
    ],
    instead: [
      { slug: 'popover', when: 'the content has links, buttons, or form fields' },
      { slug: 'dialog', when: 'the explanation is long or needs the user’s full attention' },
      { slug: 'badge', when: 'the information should always be visible, not only on hover' },
    ],
    faq: [
      {
        q: 'Why is my shadcn tooltip not showing?',
        a: 'Most often the Tooltip is not inside a TooltipProvider, which Radix requires. Wrap your app or layout in TooltipProvider once and every tooltip inside it will work.',
      },
      {
        q: 'How do I change the tooltip delay?',
        a: 'Set delayDuration on TooltipProvider for every tooltip, or on a single Tooltip root to override it. The value is in milliseconds.',
      },
      {
        q: 'How do I show a tooltip on a disabled button?',
        a: 'Wrap the disabled button in a span and make the span the TooltipTrigger with asChild. Disabled buttons do not fire pointer events, so the tooltip cannot open from them directly.',
      },
      {
        q: 'Do tooltips work on mobile?',
        a: 'Not reliably, because touch screens have no hover. Do not put essential information only in a tooltip; use visible text or a popover for anything users must read.',
      },
    ],
  },
};

export function guideFaqSchema(guide: CategoryGuide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
