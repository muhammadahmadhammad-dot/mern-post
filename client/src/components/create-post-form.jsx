import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"


export function CreatePostForm({
  className,
  errors = {},
  handelSubmit = () => {},
  inputs = {},
  handelChange = () => {},
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create</CardTitle>
          <CardDescription>
            Create New Post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handelSubmit}>
            <div className="flex flex-col gap-6">
            
              <div className="grid gap-2">
                <Label htmlFor="Text">Text</Label>
                <Textarea 
                  placeholder="Enter Text"
                  required
                  name="text"
                  value={inputs.text}
                  onChange={handelChange}
                />

                
                {errors?.text && (
                  <p className="text-red-500">{errors?.text._errors[0]}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
