import {
  TbFaceId,
  TbRun,
  TbHandStop,
  TbAlien,
  TbCircleSquare,
  TbPhoto,
} from 'react-icons/tb';

interface NavLinksProps {
  label: string;
  link: string;
  icon: React.ReactNode;
}

export const navlinks: NavLinksProps[] = [
  {
    label: 'Simple face detection',
    link: '/',
    icon: <TbFaceId size={20} strokeWidth={2} />,
  },
  {
    label: 'Face landmark detection',
    link: '/face-landmark-detection',
    icon: <TbAlien size={20} strokeWidth={2} />,
  },
  {
    label: 'Pose detection',
    link: '/pose-detection',
    icon: <TbRun size={20} strokeWidth={2} />,
  },
  {
    label: 'Hand pose detection',
    link: '/hand-pose-detection',
    icon: <TbHandStop size={20} strokeWidth={2} />,
  },
  {
    label: 'Object detection',
    link: '/object-detection',
    icon: <TbCircleSquare size={20} strokeWidth={2} />,
  },
  {
    label: 'Image classification',
    link: '/image-classification',
    icon: <TbPhoto size={20} strokeWidth={2} />,
  },
];
