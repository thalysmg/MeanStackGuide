import { Component/*, Input*/, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  // postsService: PostsService; o 'public' do construtor cria um atributo com o valor passado no construtor

  constructor(public postsService: PostsService) {
    // this.postsService = postsService;
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  onDelete(postID: string) {
    this.postsService.deletePost(postID);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
