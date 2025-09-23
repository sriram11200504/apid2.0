import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Star,
  Clock,
  Send,
  Shield,
  Lightbulb
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// App components
const initialForumPosts = [
  {
    id: 1,
    author: "Anonymous Student",
    topic: "academic",
    title: "Struggling with final exam anxiety",
    preview: "I'm feeling overwhelmed with upcoming finals. Any tips for managing the stress?",
    replies: 2,
    timeAgo: "2 hours ago",
    sadReactions: 15,
    angerReactions: 5,
    shockReactions: 2,
    heartReactions: 8,
    userReaction: null,
  },
  {
    id: 2,
    author: "CS Student",
    topic: "anxiety",
    title: "Social anxiety in group projects",
    preview: "How do you handle working in groups when you have social anxiety?",
    replies: 2,
    timeAgo: "5 hours ago",
    sadReactions: 22,
    angerReactions: 2,
    shockReactions: 1,
    heartReactions: 10,
    userReaction: null,
  },
  {
    id: 3,
    author: "First Year",
    topic: "general",
    title: "Feeling homesick and isolated",
    preview: "It's been hard adjusting to campus life. Missing home a lot...",
    replies: 2,
    timeAgo: "1 day ago",
    sadReactions: 35,
    angerReactions: 1,
    shockReactions: 4,
    heartReactions: 25,
    userReaction: null,
  }
];

const topics = [
  { id: "academic", label: "Academic Stress", color: "bg-blue-100 text-blue-800" },
  { id: "anxiety", label: "Anxiety Support", color: "bg-green-100 text-green-800" },
  { id: "depression", label: "Depression", color: "bg-purple-100 text-purple-800" },
  { id: "relationships", label: "Relationships", color: "bg-pink-100 text-pink-800" },
  { id: "general", label: "General Wellness", color: "bg-yellow-100 text-yellow-800" },
];

const volunteers = [
  {
    name: "Sarah M.",
    role: "Peer Supporter",
    year: "3rd Year Psychology",
    specialty: "Anxiety & Study Stress",
    rating: 4.9,
    responses: 150,
    initials: "SM"
  },
  {
    name: "Raj P.",
    role: "Mental Health Advocate",
    year: "4th Year Social Work",
    specialty: "Depression & Wellness",
    rating: 4.8,
    responses: 200,
    initials: "RP"
  },
  {
    name: "Priya K.",
    role: "Peer Counselor",
    year: "Graduate Student",
    specialty: "Academic Pressure",
    rating: 5.0,
    responses: 75,
    initials: "PK"
  }
];

// Reusable components
const ForumPostCard = ({ post, onReact }) => {
  const topic = topics.find(t => t.id === post.topic);

  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {post.author.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.author}</p>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
              </div>
            </div>
          </div>
          {topic && (
            <Badge className={topic.color}>{topic.label}</Badge>
          )}
        </div>
        <CardTitle className="text-lg">{post.title}</CardTitle>
        <CardDescription>{post.preview}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.replies} replies</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`cursor-pointer p-1 rounded-full ${post.userReaction === 'sad' ? 'bg-blue-100' : ''}`} onClick={() => onReact(post.id, 'sad')}>
                😢 {post.sadReactions}
              </span>
              <span className={`cursor-pointer p-1 rounded-full ${post.userReaction === 'anger' ? 'bg-blue-100' : ''}`} onClick={() => onReact(post.id, 'anger')}>
                😠 {post.angerReactions}
              </span>
              <span className={`cursor-pointer p-1 rounded-full ${post.userReaction === 'shock' ? 'bg-blue-100' : ''}`} onClick={() => onReact(post.id, 'shock')}>
                😳 {post.shockReactions}
              </span>
              <span className={`cursor-pointer p-1 rounded-full ${post.userReaction === 'heart' ? 'bg-blue-100' : ''}`} onClick={() => onReact(post.id, 'heart')}>
                ❤️ {post.heartReactions}
              </span>
            </div>
          </div>
          <Button variant="support" size="sm" onClick={() => window.location.hash = `discussion/${post.id}`}>
            View Discussion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const DiscussionPage = ({ onBack, postId }) => {
  const post = initialForumPosts.find(p => p.id === parseInt(postId));
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah M. (Peer Supporter)",
      content: "This is a great question. Remember that your feelings are valid. It might help to break down your studying into smaller, manageable chunks. You've got this!",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      author: "Tsunade106",
      content: "I've been there. Try doing a quick 5-minute meditation before you start studying. It really helps to clear the mind.",
      timeAgo: "1 hour ago"
    }
  ]);
  const [replyingTo, setReplyingTo] = useState(null);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-medium text-foreground mb-2">Post not found</h3>
        <Button onClick={onBack}>Back to Forum</Button>
      </div>
    );
  }

  const handlePostComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentObject = {
      id: comments.length + 1,
      author: "You",
      content: newComment,
      timeAgo: "Just now",
    };

    setComments([...comments, newCommentObject]);
    setNewComment("");
  };

  const handleReplyClick = (author) => {
    setReplyingTo(author);
    setNewComment(`@${author} `);
  };

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="outline">Back to Forum</Button>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {post.author.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.author}</p>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
          <CardDescription>{post.preview}</CardDescription>
        </CardHeader>
      </Card>

      <h3 className="text-xl font-semibold mt-8">Replies ({comments.length})</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{comment.author}</p>
                  <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                </div>
              </div>
              <CardContent className="p-0 pt-4 text-muted-foreground">
                <p>{comment.content}</p>
                <Button variant="link" size="sm" onClick={() => handleReplyClick(comment.author)}>Reply</Button>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostComment} className="space-y-4">
            <Textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyingTo ? `Replying to ${replyingTo}...` : "Write your comment here..."}
              className="min-h-[100px]"
            />
            <Button type="submit" variant="support" className="w-full">
              Post Comment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};


// Main App Component
const App = () => {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [currentTab, setCurrentTab] = useState("forum");
  const [currentDiscussion, setCurrentDiscussion] = useState(null);
  const [forumPosts, setForumPosts] = useState(initialForumPosts);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith("discussion/")) {
        const postId = hash.split("/")[1];
        setCurrentDiscussion(postId);
      } else {
        setCurrentDiscussion(null);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim() || !selectedTopic) return;
    
    toast({
      title: "Post shared successfully",
      description: "Your anonymous post has been shared with the community. Peer supporters will respond soon.",
    });
    setNewPost("");
    setSelectedTopic("");
  };

  const handleReact = (postId, reactionType) => {
    setForumPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          const newPost = { ...post };
          
          if (newPost.userReaction === reactionType) {
            // Un-toggling the same emoji
            newPost[`${reactionType}Reactions`]--;
            newPost.userReaction = null;
            toast({ title: "Reaction removed." });
          } else {
            // Toggling to a new emoji
            if (newPost.userReaction) {
              // Decrement the old reaction count
              newPost[`${newPost.userReaction}Reactions`]--;
            }
            newPost[`${reactionType}Reactions`]++;
            newPost.userReaction = reactionType;
            toast({ title: "Reaction noted." });
          }
          return newPost;
        }
        return post;
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Peer Support Platform</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with trained student volunteers and peers in a safe, moderated environment
          </p>
        </div>

        <Tabs value={currentDiscussion ? "discussion" : currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="forum" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Community Forum</span>
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Peer Supporters</span>
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Share & Support</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Community Forum */}
          <TabsContent value="forum">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Recent Discussions</h2>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>Moderated</span>
                  </Badge>
                </div>

                {forumPosts.map((post) => (
                  <ForumPostCard key={post.id} post={post} onReact={handleReact} />
                ))}
              </div>

              {/* Forum Guidelines */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Community Guidelines</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span>Be respectful and supportive to all members</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span>No personal information sharing</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span>Professional help recommended for crises</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span>All discussions are monitored for safety</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Popular Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {topics.map((topic) => (
                        <Badge key={topic.id} className={`${topic.color} mr-2 mb-2`}>
                          {topic.label}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Peer Volunteers */}
          <TabsContent value="volunteers">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteers.map((volunteer, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {volunteer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{volunteer.name}</CardTitle>
                        <CardDescription>{volunteer.year}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">{volunteer.role}</Badge>
                        <p className="text-sm text-muted-foreground">
                          <strong>Specialty:</strong> {volunteer.specialty}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{volunteer.rating}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {volunteer.responses} responses
                        </span>
                      </div>

                      <Button variant="support" className="w-full">
                        Connect with {volunteer.name.split(' ')[0]}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Share & Support */}
          <TabsContent value="share">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <span>Share Your Experience</span>
                  </CardTitle>
                  <CardDescription>
                    Your story can help others feel less alone. All posts are anonymous and moderated.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Choose a topic</label>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((topic) => (
                          <Badge
                            key={topic.id}
                            className={`cursor-pointer transition-all ${
                              selectedTopic === topic.id 
                                ? topic.color + ' ring-2 ring-primary' 
                                : 'bg-muted text-muted-foreground hover:bg-accent'
                            }`}
                            onClick={() => setSelectedTopic(topic.id)}
                          >
                            {topic.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Your message</label>
                      <Textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Share what's on your mind... Your post will be anonymous and help others who might be going through similar experiences."
                        className="min-h-[120px]"
                      />
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Helpful Tips</span>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Be specific about your feelings or situation</li>
                        <li>• Share coping strategies that have worked for you</li>
                        <li>• Ask for advice or support from the community</li>
                      </ul>
                    </div>

                    <Button 
                      type="submit" 
                      variant="support" 
                      className="w-full"
                      disabled={!newPost.trim() || !selectedTopic}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Share Anonymously
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {currentDiscussion && (
            <TabsContent value="discussion">
              <DiscussionPage 
                postId={currentDiscussion} 
                onBack={() => window.location.hash = ""} 
              />
            </TabsContent>
          )}

        </Tabs>
      </div>
    </div>
  );
};

export default App;
