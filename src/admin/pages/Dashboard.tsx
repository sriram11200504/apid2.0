import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/AuthStore";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  AlertTriangle,
  Heart,
  MessageCircle,
  BookOpen,
  Shield,
  Download,
  X,
  CheckCircle,
  Info
} from "lucide-react";

// Component to display individual alert
const AlertItem = ({ alert, onDismiss }) => {
  const  admin = useAuthStore(store => store.user);
  
  const [profile, setProfile] = useState();
  useEffect(() => {
    // Show browser alert when this component mounts
    // alert && window.alert(alert.userMessage);
    // setProfile(user);
    // console.log(user)

  }, []);
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
      <div>
        <p className="font-medium text-red-700 flex items-center space-x-1">
          <AlertTriangle className="h-5 w-5" />
          <span>High Suicide Risk</span>

        </p>
        <p className="text-sm">User prompt:{alert.userMessage} </p>
        <p className="text-xs text-muted-foreground">Student:{alert.user.name}</p>
        <p className="text-xs text-muted-foreground">Mail:{alert.user.email}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(alert.timestamp).toLocaleString()}
        </p>
      </div>
      <button onClick={onDismiss} className="text-gray-500 hover:text-gray-700">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

// AdminAlerts component with WebSocket
const AdminAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("Connected to WebSocket for admin alerts");
    };

    ws.onmessage = (event) => {
      try {
        const newAlerts = JSON.parse(event.data);
        setAlerts((prev) => [...newAlerts, ...prev]);
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("WebSocket connection closed");

    return () => ws.close();
  }, []);

  const dismissAlert = (index) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {alerts.length === 0 && <p className="text-sm text-muted-foreground">No urgent alerts.</p>}
      {alerts.map((alert, index) => (
        <AlertItem key={index} alert={alert} onDismiss={() => dismissAlert(index)} />
      ))}
    </div>
  );
};

// Main Admin Dashboard
const Admin = () => {
  const stats = {
    totalBookings: 234,
    activeUsers: 1847,
    resourceViews: 5629,
    forumPosts: 89,
    urgentCases: 12,
    satisfactionRate: 94
  };

  const trendData = [
    { category: "Anxiety", percentage: 45, trend: "up", color: "bg-blue-500" },
    { category: "Academic Stress", percentage: 38, trend: "up", color: "bg-green-500" },
    { category: "Depression", percentage: 25, trend: "down", color: "bg-purple-500" },
    { category: "Social Issues", percentage: 18, trend: "up", color: "bg-pink-500" },
    { category: "Sleep Problems", percentage: 32, trend: "up", color: "bg-yellow-500" }
  ];

  const resourceMetrics = [
    { name: "Stress Management Videos", views: 1243, downloads: 89, rating: 4.8 },
    { name: "Meditation Audio Guide", views: 987, downloads: 156, rating: 4.9 },
    { name: "Study Anxiety Toolkit", views: 756, downloads: 234, rating: 4.7 },
    { name: "Sleep Hygiene Guide", views: 543, downloads: 67, rating: 4.6 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Anonymous analytics and insights for mental health interventions
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Shield className="h-5 w-5 text-trust" />
            <span className="text-sm text-muted-foreground">All data is anonymized and HIPAA compliant</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-trust" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  <p className="text-xs text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-wellness" />
                <div>
                  <p className="text-2xl font-bold">{stats.activeUsers}</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-support" />
                <div>
                  <p className="text-2xl font-bold">{stats.resourceViews}</p>
                  <p className="text-xs text-muted-foreground">Resource Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.forumPosts}</p>
                  <p className="text-xs text-muted-foreground">Forum Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{stats.urgentCases}</p>
                  <p className="text-xs text-muted-foreground">Urgent Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.satisfactionRate}%</p>
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mental Health Trends</CardTitle>
                  <CardDescription>Most common concerns this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${item.color}`}></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{item.category}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{item.percentage}%</span>
                              <TrendingUp className={`h-4 w-4 ${item.trend === 'up' ? 'text-red-500' : 'text-green-500'}`} />
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Utilization</CardTitle>
                  <CardDescription>Platform usage breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-trust" />
                        <span>Counseling Bookings</span>
                      </div>
                      <Badge variant="secondary">234 total</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-wellness" />
                        <span>Resource Access</span>
                      </div>
                      <Badge variant="secondary">5.6k views</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5 text-support" />
                        <span>Peer Support</span>
                      </div>
                      <Badge variant="secondary">89 posts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends */}
          <TabsContent value="trends">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emerging Patterns</CardTitle>
                  <CardDescription>Insights for intervention planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">High Priority Areas</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm font-medium text-red-800">Exam Period Stress</p>
                          <p className="text-xs text-red-600">300% increase in anxiety-related bookings</p>
                        </div>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-sm font-medium text-orange-800">Sleep Disorders</p>
                          <p className="text-xs text-orange-600">Rising trend among first-year students</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Positive Trends</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm font-medium text-green-800">Resource Engagement</p>
                          <p className="text-xs text-green-600">40% increase in self-help tool usage</p>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">Peer Support Growth</p>
                          <p className="text-xs text-blue-600">More students becoming volunteers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Performance</CardTitle>
                <CardDescription>Most accessed mental health resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceMetrics.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{resource.name}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span>{resource.views} views</span>
                          <span>{resource.downloads} downloads</span>
                          <div className="flex items-center space-x-1">
                            <span>⭐ {resource.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts */}
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts & Notifications</CardTitle>
                <CardDescription>Important updates requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminAlerts />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
