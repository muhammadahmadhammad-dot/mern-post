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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export function PostForm({
  className,
  edit=false,
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
          <CardTitle className="text-2xl">{edit ? 'Edit' : 'Create '}</CardTitle>
          <CardDescription>
            {edit ? 'Edit' : 'Create New'} Post
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
              {
                edit && <div className="grid gap-2">
                <Label htmlFor="Text">Status</Label>
                <Select name="status" required
                value={inputs.status.toString()}
                onValueChange={(value)=>handelChange({target:{name:'status',value}})}
                  >
  <SelectTrigger >
    <SelectValue placeholder="Select --" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem   value="true">Active</SelectItem>
    <SelectItem value="false">In Active</SelectItem>
  </SelectContent>
</Select>


                
                {errors?.status && (
                  <p className="text-red-500">{errors?.status._errors[0]}</p>
                )}
              </div>
              }
              <Button type="submit"  className="w-full">
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
