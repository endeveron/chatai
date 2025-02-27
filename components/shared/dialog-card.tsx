import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TWithChildren } from '@/lib/types/common.types';

type DialogCardProps = TWithChildren & {
  title: string;
  description?: string;
};

const DialogCard = ({ title, description, children }: DialogCardProps) => {
  return (
    <Card className="card max-w-[336px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description && <p className="text-sm">{description}</p>}
        <div className="text-sm flex flex-col">{children}</div>
      </CardContent>
    </Card>
  );
};

DialogCard.displayName = 'DialogCard';

export default DialogCard;
