const TaskNames = {
    CreateSketch: 'Create idea Sketch',
    CreateSchema: 'Develop Schema ',
    CreateModel: 'Develop 3D model',
    CreatePlan: 'Develop Plan',

    CreateOutline: 'Divide to outlines',
    ArtifactSet: 'Compose your projects',
    Critique: 'Provide feedback',
    Meeting: 'Open Discussion Meeting',
    Requirements: 'Discuss Project Requirments',
    CreateFeedback: 'What needs improvements?',
    FragmentPlan: 'Divide plan',
    ImprovePlanFragment: 'Improve plan',
    MergeFragments: 'Merge improvements',
    FindFixes: 'Find things to fix',
    FixPlan: 'Fix plan',
    Presentation: 'Client Presentation',
    CoDesign: 'CoDesign Workshop',
    FinalMeeting:'Final Round Table Meeting',
};

const ArtifactNames = {
    CreateSketch: 'Sketch',
    CreateSchema: 'Schema',
    CreateModel: 'Model',
    CreatePlan: 'Plan',
    CreatePlanFragment: 'Plan fragment',
    CreateOutline: 'Outline',
    ArtifactSet: 'Project set',
    Presentation: 'Presentation',
    CreateCritique: 'Critique',
    CreateFeedback: 'Improvements',
    FragmentPlan: 'Plan part',
    ImprovePlanFragment: 'Improved plan',
    MergeFragments: 'Merged plan',
};

const CreateSketchMicroTasks = [
    // 'Get familiar with the project by reading the requirements.',
    'What is expected',
    'About the project',
    'Task steps',
];

const CritiqueMicroTasks = [
    'Read design brief',
    'Identify the designs you like',
    'Choose the best design',
    'Discuss the design',
    'Provide feedback',
];

const CreateCritiqueMicroTasks = [
    'Get familiar with the project by reading the requirements.',
    'Inspect the presented design and write your opinion according to the following questions',
];

const CreateSchemaMicroTasks = [
    'Get familiar with the project by reading the requirements.',
    'Learn what is a schema and explore some examples',
    'Review the base idea and the provided critique',
    'Sketch a quick schema that solves some of the major project requirements.',
];

const CreateSchemaMicroTasksImprove = [
    'Get familiar with the project by reading the requirements.',
    'Review the base idea and the provided critique',
    'Gather together your supplies, including A4 paper, markers and pencils and pens.',
    'Sketch a quick schema that solves the provided critique',
    'Take a photo of the schema using your smartphone.',
    'Remove unused areas from your photo using the CROP option.',
    'Enhance the readability of your photo by aligning the brightness, contrast and colors of the photo.',
];

const CreateCritiqueMicroTasksImprove = CreateCritiqueMicroTasks;

const CreateOutlineMicroTasks = [
    'Review the task',
    'View the model you need to convert to plans',
    'Create the plans',
];

const CreatePlanMicroTasks = [
    'Get familiar with the project by reading the requirements.',
    'Review the plan and review the provided critique',
    'Create an floor plan from the downloaded outline',
];

const FragmentPlanMicroTasks = [
    'Get familiar with the project by reading the requirements.',
    'Learn how to create design tasks and explore some examples',
    'Download the plan and review the provided critique',
    'Create an design tasks from the downloaded plan',
];

const CreateModelMicroTasks = CreateSketchMicroTasks;
const ImprovePlanFragmentMicroTasks = [
    'Get familiar with the project by reading the requirements.',
    'Learn what is a floor plan and explore some examples',
    'Review the plan and review the provided critique',
    'Create an floor plan from the downloaded outline',
];

const MergeFragmentsMicroTasks = ['Generate a merged plan'];

const FixPlanMicroTasks = ['Learn how to fix plans', 'Fix the plan'];

const PresentationMicroTasks = [
    'Get familiar with the project by reading the requirements.',
    'Generate a presentation',
];
export {
    TaskNames,
    ArtifactNames,
    CreateSketchMicroTasks,
    CreateCritiqueMicroTasks,
    CreatePlanMicroTasks,
    CreateCritiqueMicroTasksImprove,
    CreateSchemaMicroTasks,
    CreateSchemaMicroTasksImprove,
    CreateOutlineMicroTasks,
    FragmentPlanMicroTasks,
    CreateModelMicroTasks,
    ImprovePlanFragmentMicroTasks,
    MergeFragmentsMicroTasks,
    FixPlanMicroTasks,
    PresentationMicroTasks,
    CritiqueMicroTasks,
};
