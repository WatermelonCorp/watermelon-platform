import ErrorOne, { defaultErrorOneAction } from './index';

export default function ErrorOneDemo() {
  return (
    <ErrorOne
      code="404"
      title="No, no, that's right."
      description="This is a 404 page. And this page exists, no matter what anyone says."
      action={defaultErrorOneAction}
    />
  );
}
